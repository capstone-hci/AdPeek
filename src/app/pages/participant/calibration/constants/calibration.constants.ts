import type { CalibrationPoint } from '../types/calibration.types';

// 3×3 그리드, 가장자리 10% 여백
export const CALIBRATION_POINTS: CalibrationPoint[] = [
  { id: 0, nx: 0.1, ny: 0.1 },
  { id: 1, nx: 0.5, ny: 0.1 },
  { id: 2, nx: 0.9, ny: 0.1 },
  { id: 3, nx: 0.1, ny: 0.5 },
  { id: 4, nx: 0.5, ny: 0.5 },
  { id: 5, nx: 0.9, ny: 0.5 },
  { id: 6, nx: 0.1, ny: 0.9 },
  { id: 7, nx: 0.5, ny: 0.9 },
  { id: 8, nx: 0.9, ny: 0.9 },
];

// 검증 포인트 — 캘리브레이션 그리드와 겹치지 않는 위치
export const VALIDATION_POINTS: CalibrationPoint[] = [
  { id: 0, nx: 0.3, ny: 0.25 },
  { id: 1, nx: 0.7, ny: 0.25 },
  { id: 2, nx: 0.5, ny: 0.5 },
  { id: 3, nx: 0.3, ny: 0.75 },
  { id: 4, nx: 0.7, ny: 0.75 },
];

export const RECORD_INTERVAL_MS = 200; // 포인트당 자동 기록 간격 (ms)
export const SAMPLES_PER_POINT = 10; // 포인트당 기록 횟수 (300ms × 10 = 3초)
export const POINT_TRANSITION_MS = 500; // 포인트 전환 대기 (ms)
export const SETTLE_TIME_MS = 1000; // 검증: 눈 고정 대기 (ms)
export const SAMPLING_DURATION_MS = 1000; // 검증: 시선 수집 구간 (ms)
export const ACCURACY_THRESHOLD = 50; // 통과 기준 (%)
export const MAX_ERROR_PX = 300; // 이 오차 이상이면 정확도 0%로 처리
