import type { DashboardScene } from '../types/dashboard';

const CHART = {
  left: 30,
  right: 900,
  top: 30,
  bottom: 150,
} as const;

const CHART_WIDTH = CHART.right - CHART.left;
const CHART_HEIGHT = CHART.bottom - CHART.top;

type TimelineSeries = {
  path: string;
  points: Array<{ x: number; y: number }>;
};

type PeakHighlight = {
  x: number;
  width: number;
  centerX: number;
};

const buildSeries = (
  scenes: DashboardScene[],
  key: 'avg_attention' | 'avg_arousal',
  maxTime: number
): TimelineSeries => {
  const validScenes = scenes.filter((scene) => scene[key] !== null);

  if (validScenes.length === 0) {
    return { path: '', points: [] };
  }

  const values = validScenes.map((scene) => scene[key] as number);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;

  const points = validScenes.map((scene) => {
    const time = (scene.start + scene.end) / 2;
    const value = scene[key] as number;

    return {
      x: CHART.left + (time / maxTime) * CHART_WIDTH,
      y: CHART.bottom - ((value - minValue) / valueRange) * CHART_HEIGHT,
    };
  });

  const path =
    points.length === 1
      ? ''
      : `M${points.map((point) => `${point.x},${point.y}`).join(' L')}`;

  return { path, points };
};

const buildPeakHighlight = (
  scenes: DashboardScene[],
  maxTime: number
): PeakHighlight | null => {
  const validScenes = scenes.filter((scene) => scene.avg_attention !== null);

  if (validScenes.length === 0) {
    return null;
  }

  const peakScene = validScenes.reduce((peak, scene) =>
    (scene.avg_attention as number) > (peak.avg_attention as number)
      ? scene
      : peak
  );

  const x = CHART.left + (peakScene.start / maxTime) * CHART_WIDTH;
  const endX = CHART.left + (peakScene.end / maxTime) * CHART_WIDTH;

  return {
    x,
    width: Math.max(endX - x, 24),
    centerX: x + (endX - x) / 2,
  };
};

export const buildEegTimeline = (scenes: DashboardScene[], maxTime: number) => {
  const attention = buildSeries(scenes, 'avg_attention', maxTime);
  const arousal = buildSeries(scenes, 'avg_arousal', maxTime);
  const peakHighlight = buildPeakHighlight(scenes, maxTime);

  const timeTicks = [0, maxTime / 2, maxTime].map((time, index) => ({
    time,
    x: CHART.left + (time / maxTime) * CHART_WIDTH,
    label: `${time.toFixed(0)}s`,
    anchor: index === 0 ? 'start' : index === 2 ? 'end' : 'middle',
  }));

  return {
    attention,
    arousal,
    peakHighlight,
    timeTicks,
    baselineY: CHART.bottom,
    baselineX1: CHART.left,
    baselineX2: CHART.right,
    viewBoxWidth: CHART.right + 20,
  };
};
