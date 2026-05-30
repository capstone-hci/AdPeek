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
  SETTLE_TIME_MS,
  SAMPLING_DURATION_MS,
  ACCURACY_THRESHOLD,
  MAX_ERROR_PX,
} from '../constants/calibration.constants';
import { computeAccuracy } from '../utils/calibrationPoints';

export interface UseCalibrationReturn {
  status: CalibrationStatus;
  currentPointIndex: number;
  isRecording: boolean;
  totalPoints: number;
  currentCalibrationPoint: CalibrationPoint | null;
  currentValidationPoint: CalibrationPoint | null;
  gazeData: { x: number; y: number } | null;
  validationProgress: number;
  result: CalibrationResult | null;
  start: () => Promise<void>;
  retry: () => void;
  handleCalibrationClick: () => void;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const GAZE_THROTTLE_MS = 33; // ~30Hz

export function useCalibration(
  areaRef?: RefObject<HTMLElement | null>
): UseCalibrationReturn {
  const [status, setStatus] = useState<CalibrationStatus>('idle');
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [currentValidationIndex, setCurrentValidationIndex] = useState(0);
  const [gazeData, setGazeData] = useState<{ x: number; y: number } | null>(
    null
  );
  const [result, setResult] = useState<CalibrationResult | null>(null);

  const statusRef = useRef<CalibrationStatus>('idle');
  const gazeRef = useRef<{ x: number; y: number } | null>(null);
  const clickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isInitialized = useRef(false);
  const lastGazeTime = useRef(0);
  const currentPointIndexRef = useRef(0); // stale closure 방지용
  const isRecordingRef = useRef(false); // 클릭 중복 방지용

  const setStatusSync = useCallback((s: CalibrationStatus) => {
    statusRef.current = s;
    setStatus(s);
  }, []);

  const clearClickInterval = useCallback(() => {
    if (clickIntervalRef.current !== null) {
      clearInterval(clickIntervalRef.current);
      clickIntervalRef.current = null;
    }
  }, []);

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

    const areaRect = areaRef?.current?.getBoundingClientRect();

    console.group('[Calibration] 검증 결과');
    validationResults.forEach((vp, i) => {
      const n = vp.predictions.length;
      const avgX = n ? vp.predictions.reduce((s, p) => s + p.x, 0) / n : null;
      const avgY = n ? vp.predictions.reduce((s, p) => s + p.y, 0) / n : null;
      const actual = areaRect
        ? {
            x: areaRect.left + vp.nx * areaRect.width,
            y: areaRect.top + vp.ny * areaRect.height,
          }
        : { x: vp.nx * window.innerWidth, y: vp.ny * window.innerHeight };
      console.log(
        `포인트 ${i} (${vp.nx}, ${vp.ny})`,
        `| 샘플: ${n}개`,
        `| 실제: (${Math.round(actual.x)}, ${Math.round(actual.y)})`,
        `| 예측: (${avgX ? Math.round(avgX) : 'null'}, ${avgY ? Math.round(avgY) : 'null'})`
      );
    });
    console.groupEnd();

    const computed = computeAccuracy(validationResults, MAX_ERROR_PX, areaRect);
    console.log(
      `[Calibration] 정확도: ${computed.accuracy}% | 평균오차: ${computed.meanErrorPx}px`
    );
    setResult(computed);
    setStatusSync(computed.accuracy >= ACCURACY_THRESHOLD ? 'done' : 'failed');
  }, [setStatusSync, areaRef]);

  /**
   * 클릭 기반 캘리브레이션
   * 유저가 현재 점을 응시하고 클릭 → 그 순간의 눈 위치 + 점 좌표로 학습
   * RECORD_INTERVAL_MS 간격으로 SAMPLES_PER_POINT 개 수집 후 다음 점으로 이동
   */
  const handleCalibrationClick = useCallback(() => {
    if (statusRef.current !== 'calibrating') return;
    if (isRecordingRef.current) return; // 이미 기록 중이면 무시

    const pointIndex = currentPointIndexRef.current;
    const point = CALIBRATION_POINTS[pointIndex];
    if (!point) return;

    const { x, y } = getTargetPixel(point.nx, point.ny);
    isRecordingRef.current = true;
    setIsRecording(true);
    let count = 0;

    console.log(
      `[Calibration] 포인트 ${pointIndex} 클릭 → 화면좌표 (${x}, ${y})`
    );

    // 클릭 시점부터 짧은 간격으로 여러 샘플 수집 (같은 주시 상태 유지 중)
    clickIntervalRef.current = setInterval(() => {
      window.webgazer?.recordScreenPosition(x, y, 'click');
      count += 1;

      if (count >= SAMPLES_PER_POINT) {
        clearClickInterval();
        isRecordingRef.current = false;
        setIsRecording(false);
        const nextIndex = pointIndex + 1;

        if (nextIndex >= CALIBRATION_POINTS.length) {
          runValidation();
        } else {
          currentPointIndexRef.current = nextIndex;
          setCurrentPointIndex(nextIndex);
        }
      }
    }, RECORD_INTERVAL_MS);
  }, [clearClickInterval, getTargetPixel, runValidation]);

  const start = useCallback(async () => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    clearClickInterval();
    isRecordingRef.current = false;
    currentPointIndexRef.current = 0;
    gazeRef.current = null;
    lastGazeTime.current = 0;
    setStatusSync('idle');
    setCurrentPointIndex(0);
    setIsRecording(false);
    setCurrentValidationIndex(0);
    setGazeData(null);
    setResult(null);

    // 이전 세션 데이터가 남아있으면 회귀모델이 발산 → 항상 초기화
    if (window.webgazer) window.webgazer.clearData();

    await initWebGazer({
      showVideo: true,
      saveDataAcrossSessions: false,
      applyKalmanFilter: false,
      onGaze: (data) => {
        if (!data) return;

        // gazeRef는 항상 최신값 유지 (검증 샘플링에 사용)
        gazeRef.current = { x: data.x, y: data.y };

        // React state 업데이트는 30Hz로 제한
        const now = Date.now();
        if (now - lastGazeTime.current < GAZE_THROTTLE_MS) return;
        lastGazeTime.current = now;

        setGazeData({ x: data.x, y: data.y });
      },
    });

    await beginWebGazer();
    setStatusSync('calibrating');
    // 클릭 기반: 유저 클릭을 기다림 (자동 시작 없음)
  }, [clearClickInterval, setStatusSync]);

  const retry = useCallback(() => {
    clearClickInterval();
    isRecordingRef.current = false;
    isInitialized.current = false;
    currentPointIndexRef.current = 0;
    lastGazeTime.current = 0;
    if (window.webgazer) window.webgazer.clearData();
    void start();
  }, [clearClickInterval, start]);

  useEffect(() => {
    return () => {
      isInitialized.current = false;
      lastGazeTime.current = 0;
      clearClickInterval();
      destroyWebGazer();
    };
  }, [clearClickInterval]);

  return {
    status,
    currentPointIndex,
    isRecording,
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
    validationProgress:
      status === 'validating'
        ? currentValidationIndex / VALIDATION_POINTS.length
        : 0,
    result,
    start,
    retry,
    handleCalibrationClick,
  };
}
