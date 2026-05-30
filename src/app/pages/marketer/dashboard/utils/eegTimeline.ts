import type { DashboardScene } from '../types/dashboard';

const CHART = {
  left: 30,
  right: 900,
  top: 30,
  bottom: 150,
} as const;

const CHART_WIDTH = CHART.right - CHART.left;
const CHART_HEIGHT = CHART.bottom - CHART.top;
const TIME_TICK_INTERVAL_SEC = 5;

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

const buildTimeTicks = (maxTime: number) => {
  if (maxTime <= 0) {
    return [
      {
        time: 0,
        x: CHART.left,
        label: '0s',
        anchor: 'start' as const,
      },
    ];
  }

  const endSec = Math.round(maxTime);
  const tickSeconds: number[] = [];

  for (let sec = 0; sec < endSec; sec += TIME_TICK_INTERVAL_SEC) {
    tickSeconds.push(sec);
  }

  if (tickSeconds.at(-1) !== endSec) {
    tickSeconds.push(endSec);
  }

  return tickSeconds.map((sec, index, arr) => {
    const isFirst = index === 0;
    const isLast = index === arr.length - 1;

    return {
      time: isLast ? maxTime : sec,
      x: isLast ? CHART.right : CHART.left + (sec / maxTime) * CHART_WIDTH,
      label: `${sec}s`,
      anchor: (isFirst ? 'start' : isLast ? 'end' : 'middle') as
        | 'start'
        | 'middle'
        | 'end',
    };
  });
};

export const buildEegTimeline = (scenes: DashboardScene[], maxTime: number) => {
  const attention = buildSeries(scenes, 'avg_attention', maxTime);
  const arousal = buildSeries(scenes, 'avg_arousal', maxTime);
  const peakHighlight = buildPeakHighlight(scenes, maxTime);
  const timeTicks = buildTimeTicks(maxTime);

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
