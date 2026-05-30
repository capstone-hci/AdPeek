/**
 * utils/gaze.ts — 시선 궤적 시뮬레이션 유틸
 * 다음 좌표 생성(createNextGazePoint), trail 배열 갱신(appendGazePoint)
 */
import { GAZE_SIMULATION } from '../constants/simulation';
import type { GazePoint } from '../types/gaze';

export const createNextGazePoint = (last: GazePoint): GazePoint => ({
  x: Math.max(
    GAZE_SIMULATION.bounds.xMin,
    Math.min(
      GAZE_SIMULATION.bounds.xMax,
      last.x +
        (Math.random() * GAZE_SIMULATION.delta.x * 2 - GAZE_SIMULATION.delta.x)
    )
  ),
  y: Math.max(
    GAZE_SIMULATION.bounds.yMin,
    Math.min(
      GAZE_SIMULATION.bounds.yMax,
      last.y +
        (Math.random() * GAZE_SIMULATION.delta.y * 2 - GAZE_SIMULATION.delta.y)
    )
  ),
});

export const appendGazePoint = (
  trail: GazePoint[],
  next: GazePoint
): GazePoint[] => {
  const updated = [...trail, next];

  if (updated.length > GAZE_SIMULATION.trailMaxLength) {
    updated.shift();
  }

  return updated;
};
