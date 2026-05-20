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

export const RECORD_INTERVAL_MS = 80; // 클릭 후 샘플 수집 간격 (ms)
export const SAMPLES_PER_POINT = 5; // 클릭당 수집 샘플 수 (80ms × 5 = 400ms)
export const SETTLE_TIME_MS = 1500; // 검증: 눈 고정 대기 (ms)
export const SAMPLING_DURATION_MS = 1500; // 검증: 시선 수집 구간 (ms)
export const ACCURACY_THRESHOLD = 20; // 통과 기준 (%) — 웹캠 기반 한계 고려
export const MAX_ERROR_PX = 900; // 웹캠 시선추적 현실적 기준 (이상이면 0%)
