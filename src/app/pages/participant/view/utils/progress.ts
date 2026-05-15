/**
 * utils/progress.ts — 시청 진행률·남은 시간 계산 유틸
 * useAdViewingTimer에서 currentTime·totalDuration 기반으로 사용
 */
export const getProgressPercent = (current: number, total: number) =>
  (current / total) * 100;

export const getRemainSeconds = (current: number, total: number) =>
  total - current;
