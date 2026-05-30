import type {
  ValidationPoint,
  CalibrationResult,
} from '../types/calibration.types';

export function toPixel(nx: number, ny: number): { x: number; y: number } {
  return {
    x: Math.round(nx * window.innerWidth),
    y: Math.round(ny * window.innerHeight),
  };
}

export function euclideanDistance(
  a: { x: number; y: number },
  b: { x: number; y: number }
): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// 검증 포인트들의 평균 오차로 정확도 계산
export function computeAccuracy(
  validationPoints: ValidationPoint[],
  maxErrorPx: number,
  areaRect?: DOMRect
): CalibrationResult {
  const errors = validationPoints
    .filter((vp) => vp.predictions.length > 0)
    .map((vp) => {
      const actual = areaRect
        ? {
            x: areaRect.left + vp.nx * areaRect.width,
            y: areaRect.top + vp.ny * areaRect.height,
          }
        : toPixel(vp.nx, vp.ny);
      const n = vp.predictions.length;
      const avgX = vp.predictions.reduce((s, p) => s + p.x, 0) / n;
      const avgY = vp.predictions.reduce((s, p) => s + p.y, 0) / n;
      return euclideanDistance(actual, { x: avgX, y: avgY });
    });

  if (errors.length === 0) {
    return { accuracy: 0, meanErrorPx: maxErrorPx };
  }

  const meanErrorPx = errors.reduce((s, e) => s + e, 0) / errors.length;
  const accuracy = Math.max(
    0,
    Math.min(100, Math.round((1 - meanErrorPx / maxErrorPx) * 100))
  );

  return { accuracy, meanErrorPx: Math.round(meanErrorPx) };
}
