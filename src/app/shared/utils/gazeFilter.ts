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
