import type { HeatmapPoint } from '../types/dashboard';

export type HeatmapVisualSpot = {
  left: string;
  top: string;
  size: number;
  color: string;
  opacity: number;
};

const BUCKET_SIZE = 0.08;

export const buildHeatmapSpots = (
  points: HeatmapPoint[]
): HeatmapVisualSpot[] => {
  const validPoints = points.filter((point) => point.x > 0 || point.y > 0);

  if (validPoints.length === 0) {
    return [];
  }

  const buckets = new Map<string, { x: number; y: number; count: number }>();

  validPoints.forEach((point) => {
    const x = Math.round(point.x / BUCKET_SIZE) * BUCKET_SIZE;
    const y = Math.round(point.y / BUCKET_SIZE) * BUCKET_SIZE;
    const key = `${x},${y}`;
    const bucket = buckets.get(key);

    if (bucket) {
      bucket.count += 1;
      return;
    }

    buckets.set(key, { x, y, count: 1 });
  });

  const maxCount = Math.max(
    ...Array.from(buckets.values()).map((bucket) => bucket.count),
    1
  );

  return Array.from(buckets.values()).map(({ x, y, count }) => {
    const intensity = count / maxCount;

    return {
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      size: 70 + intensity * 130,
      color:
        intensity > 0.66
          ? 'rgba(240,68,82,0.75)'
          : intensity > 0.33
            ? 'rgba(245,158,11,0.65)'
            : 'rgba(139,92,246,0.5)',
      opacity: 0.45 + intensity * 0.35,
    };
  });
};
