import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type RefObject,
} from 'react';
import {
  beginWebGazer,
  destroyWebGazer,
  initWebGazer,
} from '@shared/utils/webgazerInit';
import type {
  CalibrationPoint,
  CalibrationResult,
  CalibrationStatus,
  ValidationPoint,
} from '../types/calibration.types';
import {
  CALIBRATION_POINTS,
  VALIDATION_POINTS,
  RECORD_INTERVAL_MS,
  SAMPLES_PER_POINT,
  POINT_TRANSITION_MS,
  SETTLE_TIME_MS,
  SAMPLING_DURATION_MS,
  ACCURACY_THRESHOLD,
  MAX_ERROR_PX,
} from '../constants/calibration.constants';
import { computeAccuracy } from '../utils/calibrationPoints';

export interface UseCalibrationReturn {
  status: CalibrationStatus;
  currentPointIndex: number;
  currentPointSamples: number;
  totalPoints: number;
  currentCalibrationPoint: CalibrationPoint | null;
  currentValidationPoint: CalibrationPoint | null;
  gazeData: { x: number; y: number } | null; // WebGazer 예측 좌표 (픽셀)
  recordProgress: number; // 0–1, 현재 포인트 기록 진행률
  validationProgress: number; // 0–1
  result: CalibrationResult | null;
  start: () => Promise<void>;
  retry: () => void;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * areaRef: 캘리브레이션 영역 DOM 요소.
 * 제공 시 해당 요소 기준 실제 픽셀 좌표로 학습 데이터 기록.
 * 미제공 시 window 전체 기준.
 */
export function useCalibration(
  areaRef?: RefObject<HTMLElement | null>
): UseCalibrationReturn {
  const [status, setStatus] = useState<CalibrationStatus>('idle');
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [currentPointSamples, setCurrentPointSamples] = useState(0);
  const [currentValidationIndex, setCurrentValidationIndex] = useState(0);
  const [gazeData, setGazeData] = useState<{ x: number; y: number } | null>(
    null
  );
  const [result, setResult] = useState<CalibrationResult | null>(null);

  const statusRef = useRef<CalibrationStatus>('idle');
  const gazeRef = useRef<{ x: number; y: number } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isInitialized = useRef(false);

  // startPointRecording이 자기 자신을 setTimeout으로 재귀 호출하므로 ref로 관리
  const startPointRecordingRef = useRef<(index: number) => void>(() => {});

  const setStatusSync = useCallback((s: CalibrationStatus) => {
    statusRef.current = s;
    setStatus(s);
  }, []);

  const clearRecordInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // areaRef가 있으면 실제 화면 픽셀 좌표, 없으면 window 전체 기준
  const getTargetPixel = useCallback(
    (nx: number, ny: number): { x: number; y: number } => {
      const el = areaRef?.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        return {
          x: Math.round(rect.left + nx * rect.width),
          y: Math.round(rect.top + ny * rect.height),
        };
      }
      return {
        x: Math.round(nx * window.innerWidth),
        y: Math.round(ny * window.innerHeight),
      };
    },
    [areaRef]
  );

  // 검증: 각 포인트에서 눈 고정 후 gazeRef 샘플 수집
  const runValidation = useCallback(async () => {
    setStatusSync('validating');
    const validationResults: ValidationPoint[] = [];

    for (let i = 0; i < VALIDATION_POINTS.length; i++) {
      setCurrentValidationIndex(i);
      await sleep(SETTLE_TIME_MS);

      const samples: Array<{ x: number; y: number }> = [];
      await new Promise<void>((resolve) => {
        const sampleInterval = setInterval(() => {
          if (gazeRef.current) samples.push({ ...gazeRef.current });
        }, 50);
        setTimeout(() => {
          clearInterval(sampleInterval);
          resolve();
        }, SAMPLING_DURATION_MS);
      });

      validationResults.push({ ...VALIDATION_POINTS[i], predictions: samples });
    }

    const computed = computeAccuracy(validationResults, MAX_ERROR_PX);
    setResult(computed);
    setStatusSync(computed.accuracy >= ACCURACY_THRESHOLD ? 'done' : 'failed');
  }, [setStatusSync]);

  // 포인트별 자동 기록: 예측 없어도 학습 데이터 쌓임
  const startPointRecording = useCallback(
    (pointIndex: number) => {
      clearRecordInterval();
      setCurrentPointIndex(pointIndex);
      setCurrentPointSamples(0);

      const point = CALIBRATION_POINTS[pointIndex];
      if (!point) return;

      const { x, y } = getTargetPixel(point.nx, point.ny);
      let count = 0;

      intervalRef.current = setInterval(() => {
        window.webgazer.recordScreenPosition(x, y, 'click');
        count += 1;
        setCurrentPointSamples(count);

        if (count >= SAMPLES_PER_POINT) {
          clearRecordInterval();
          const nextIndex = pointIndex + 1;

          if (nextIndex >= CALIBRATION_POINTS.length) {
            runValidation();
          } else {
            setTimeout(
              () => startPointRecordingRef.current(nextIndex),
              POINT_TRANSITION_MS
            );
          }
        }
      }, RECORD_INTERVAL_MS);
    },
    [clearRecordInterval, getTargetPixel, runValidation]
  );

  useEffect(() => {
    startPointRecordingRef.current = startPointRecording;
  }, [startPointRecording]);

  const start = useCallback(async () => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    clearRecordInterval();
    gazeRef.current = null;
    setStatusSync('idle');
    setCurrentPointIndex(0);
    setCurrentPointSamples(0);
    setCurrentValidationIndex(0);
    setGazeData(null);
    setResult(null);

    initWebGazer({
      showVideo: true,
      saveDataAcrossSessions: true,
      applyKalmanFilter: false,
      onGaze: (data) => {
        if (!data) return;
        gazeRef.current = { x: data.x, y: data.y };
        setGazeData({ x: data.x, y: data.y });
      },
    });

    await beginWebGazer();
    setStatusSync('calibrating');
    startPointRecordingRef.current(0);
  }, [clearRecordInterval, setStatusSync]);

  const retry = useCallback(() => {
    clearRecordInterval();
    isInitialized.current = false;
    window.webgazer.clearData();
    start();
  }, [clearRecordInterval, start]);

  useEffect(() => {
    return () => {
      isInitialized.current = false;
      clearRecordInterval();
      destroyWebGazer();
    };
  }, [clearRecordInterval]);

  return {
    status,
    currentPointIndex,
    currentPointSamples,
    totalPoints: CALIBRATION_POINTS.length,
    currentCalibrationPoint:
      status === 'calibrating'
        ? (CALIBRATION_POINTS[currentPointIndex] ?? null)
        : null,
    currentValidationPoint:
      status === 'validating'
        ? (VALIDATION_POINTS[currentValidationIndex] ?? null)
        : null,
    gazeData,
    recordProgress:
      SAMPLES_PER_POINT > 0 ? currentPointSamples / SAMPLES_PER_POINT : 0,
    validationProgress:
      status === 'validating'
        ? currentValidationIndex / VALIDATION_POINTS.length
        : 0,
    result,
    start,
    retry,
  };
}
