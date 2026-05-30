export type CalibrationStatus =
  | 'idle'
  | 'calibrating'
  | 'validating'
  | 'done'
  | 'failed';

export interface CalibrationPoint {
  id: number;
  nx: number; // 정규화 x [0, 1]
  ny: number; // 정규화 y [0, 1]
}

export interface ValidationPoint extends CalibrationPoint {
  predictions: Array<{ x: number; y: number }>;
}

export interface CalibrationResult {
  accuracy: number; // 0–100 점수
  meanErrorPx: number; // 평균 Euclidean 오차 (픽셀)
}
