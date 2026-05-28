/**
 * types/dashboard.ts — 대시보드 데이터 타입.
 */
export type Campaign = {
  name: string;
  meta: string;
  color: string;
  active: boolean;
};

export type MetricCardItem = {
  label: string;
  value: string;
  sub: string;
  color: string;
};

export type HeatmapSpot = {
  left: string;
  top: string;
  size: number;
  color: string;
};
