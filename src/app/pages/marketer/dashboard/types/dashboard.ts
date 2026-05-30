/**
 * types/dashboard.ts — 대시보드 API 응답 타입.
 */
export type Campaign = {
  id: string;
  name: string;
  title: string;
  durationSec: number;
  color: string;
};

export type MetricCardItem = {
  label: string;
  value: string;
  sub: string;
  color: string;
};

export type HeatmapPoint = {
  x: number;
  y: number;
};

export type DashboardScene = {
  scene: number;
  start: number;
  end: number;
  description: string;
  avg_attention: number | null;
  avg_arousal: number | null;
  heatmap_data: HeatmapPoint[];
};

export type AoiRow = {
  area: string;
  dwell: string;
  count: number;
};

export type DashboardInsights = {
  attentionPercent: number | null;
  recallRate: number | null;
  gaze: {
    maxGazeRange: string;
    maxDwellTime: string;
    aoiRows: AoiRow[];
  };
  eeg: {
    attentionPeakRange: string;
    arousalPeakRange: string;
  };
  survey: {
    recallRate: string | null;
    purchaseIntent: string | null;
    positiveEmotion: string | null;
  };
};

export type DashboardResponse = {
  ad_id: string;
  participant_count: number;
  avg_attention: number;
  avg_arousal: number;
  heatmap_data: HeatmapPoint[];
  scenes: DashboardScene[];
  insights: DashboardInsights;
};
