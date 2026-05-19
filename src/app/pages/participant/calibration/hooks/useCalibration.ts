import { useState, useRef, useCallback } from 'react';
import { beginWebGazer, initWebGazer } from '@shared/utils/webgazerInit';
import type {
  CalibrationStatus,
  CalibrationPoint,
  CalibrationResult,
  ValidationPoint,
} from '../types/calibration.types';
import {
  CALIBRATION_POINTS,
  VALIDATION_POINTS,
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
  currentPointSamples: number;
  totalPoints: number;
  currentCalibrationPoint: CalibrationPoint | null;
  currentValidationPoint: CalibrationPoint | null;
  validationProgress: number; // 0–1
  result: CalibrationResult | null;
  start: () => Promise<void>;
  handleClick: (x: number, y: number) => void;
  retry: () => void;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useCalibration(): UseCalibrationReturn {
  const [status, setStatus] = useState<CalibrationStatus>('idle');
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [currentPointSamples, setCurrentPointSamples] = useState(0);
  const [currentValidationIndex, setCurrentValidationIndex] = useState(0);
  const [result, setResult] = useState<CalibrationResult | null>(null);

  const statusRef = useRef<CalibrationStatus>('idle');
  const sampleCountRef = useRef(0);
  const pointIndexRef = useRef(0);

  const setStatusSync = useCallback((s: CalibrationStatus) => {
    statusRef.current = s;
    setStatus(s);
  }, []);

  const reset = useCallback(() => {
    setStatusSync('idle');
    setCurrentPointIndex(0);
    setCurrentPointSamples(0);
    setCurrentValidationIndex(0);
    setResult(null);
    sampleCountRef.current = 0;
    pointIndexRef.current = 0;
  }, [setStatusSync]);

  const runValidation = useCallback(async () => {
    setStatusSync('validating');
    const validationResults: ValidationPoint[] = [];

    for (let i = 0; i < VALIDATION_POINTS.length; i++) {
      const vp = VALIDATION_POINTS[i];
      setCurrentValidationIndex(i);

      // 눈이 포인트에 고정될 때까지 대기
      await sleep(SETTLE_TIME_MS);

      // SAMPLING_DURATION_MS 동안 시선 예측 수집
      const samples: Array<{ x: number; y: number }> = [];
      await new Promise<void>((resolve) => {
        window.webgazer.setGazeListener((data) => {
          if (data) samples.push({ x: data.x, y: data.y });
        });
        setTimeout(() => {
          window.webgazer.clearGazeListener();
          resolve();
        }, SAMPLING_DURATION_MS);
      });

      validationResults.push({ ...vp, predictions: samples });
    }

    const computed = computeAccuracy(validationResults, MAX_ERROR_PX);
    setResult(computed);
    setStatusSync(computed.accuracy >= ACCURACY_THRESHOLD ? 'done' : 'failed');
  }, [setStatusSync]);

  const start = useCallback(async () => {
    reset();
    // 세션 간 학습 데이터 유지 + Kalman은 검증 후 수집 단계에서 켬
    initWebGazer({ saveDataAcrossSessions: true, applyKalmanFilter: false });
    await beginWebGazer();
    setStatusSync('calibrating');
  }, [reset, setStatusSync]);

  const handleClick = useCallback(
    (x: number, y: number) => {
      if (statusRef.current !== 'calibrating') return;

      // WebGazer 회귀 모델 학습
      window.webgazer.recordScreenPosition(x, y, 'click');

      sampleCountRef.current += 1;
      setCurrentPointSamples(sampleCountRef.current);

      if (sampleCountRef.current >= SAMPLES_PER_POINT) {
        const nextIndex = pointIndexRef.current + 1;
        pointIndexRef.current = nextIndex;

        if (nextIndex >= CALIBRATION_POINTS.length) {
          runValidation();
        } else {
          sampleCountRef.current = 0;
          setCurrentPointSamples(0);
          setCurrentPointIndex(nextIndex);
        }
      }
    },
    [runValidation]
  );

  const retry = useCallback(() => {
    window.webgazer.clearData();
    reset();
  }, [reset]);

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
    validationProgress:
      status === 'validating'
        ? currentValidationIndex / VALIDATION_POINTS.length
        : 0,
    result,
    start,
    handleClick,
    retry,
  };
}
