// 픽셀 좌표
export interface GazePoint {
  x: number;
  y: number;
}

// 정규화 좌표
export interface NormalizedPoint {
  nx: number;
  ny: number;
}

export function isValidGazePoint(data: GazePoint | null): data is GazePoint {
  return data !== null;
}

// 화면 밖 좌표를 무시
export function isInBounds(
  point: GazePoint,
  width = window.innerWidth,
  height = window.innerHeight
): boolean {
  return point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height;
}

// 최근 [windowSize]개 좌표의 평균을 구하여 노이즈 감소
export function movingAverage(windowSize = 5) {
  // 최근 좌표
  const buffer: GazePoint[] = [];

  return function filter(point: GazePoint): GazePoint {
    buffer.push(point);

    if (buffer.length > windowSize) {
      buffer.shift();
    }

    const avgX = buffer.reduce((sum, p) => sum + p.x, 0) / buffer.length;
    const avgY = buffer.reduce((sum, p) => sum + p.y, 0) / buffer.length;

    return { x: avgX, y: avgY };
  };
}

// One Euro Filter 내부 계산: 컷오프 주파수 → 알파값 변환
function computeAlpha(cutoff: number, dt: number): number {
  const tau = 1 / (2 * Math.PI * cutoff);
  return 1 / (1 + tau / dt);
}

export function oneEuroFilter(minCutoff = 1.0, beta = 0.007, dCutoff = 1.0) {
  let prevX: number | null = null;
  let prevY: number | null = null;
  let prevDX = 0;
  let prevDY = 0;
  let prevTimestamp: number | null = null;

  return function filter(point: GazePoint, timestamp: number): GazePoint {
    // 첫 호출이면 그냥 통과
    if (prevX === null || prevY === null || prevTimestamp === null) {
      prevX = point.x;
      prevY = point.y;
      prevTimestamp = timestamp;
      return point;
    }

    // 경과 시간 (초 단위, 최소값으로 0 나누기 방지)
    const dt = Math.max((timestamp - prevTimestamp) / 1000, 1e-6);
    prevTimestamp = timestamp;

    // x축 속도 추정 후 필터링
    const rawDX = (point.x - prevX) / dt;
    const da = computeAlpha(dCutoff, dt);
    const dX = da * rawDX + (1 - da) * prevDX;
    prevDX = dX;

    // 속도에 따라 컷오프 조절 → 알파 계산 → x 필터링
    const cutoffX = minCutoff + beta * Math.abs(dX);
    const aX = computeAlpha(cutoffX, dt);
    const filteredX = aX * point.x + (1 - aX) * prevX;
    prevX = filteredX;

    // y축도 동일하게 처리
    const rawDY = (point.y - prevY) / dt;
    const dY = da * rawDY + (1 - da) * prevDY;
    prevDY = dY;

    const cutoffY = minCutoff + beta * Math.abs(dY);
    const aY = computeAlpha(cutoffY, dt);
    const filteredY = aY * point.y + (1 - aY) * prevY;
    prevY = filteredY;

    return { x: filteredX, y: filteredY };
  };
}

// 해상도 상관없이 표현되도록 정규화
export function pixelToNormalized(
  point: GazePoint,
  width = window.innerWidth,
  height = window.innerHeight
): NormalizedPoint {
  return {
    nx: Math.min(Math.max(point.x / width, 0), 1),
    ny: Math.min(Math.max(point.y / height, 0), 1),
  };
}

// 정규화 좌표 -> 픽셀 좌표 (시각화 시 사용)
export function normalizedToPixel(
  point: NormalizedPoint,
  width = window.innerWidth,
  height = window.innerHeight
): GazePoint {
  return {
    x: Math.round(point.nx * width),
    y: Math.round(point.ny * height),
  };
}
