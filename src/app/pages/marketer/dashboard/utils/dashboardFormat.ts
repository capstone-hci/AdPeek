import type { DashboardResponse, MetricCardItem } from '../types/dashboard';

export const formatDisplayValue = (
  value: string | number | null | undefined
): string => {
  if (value === null || value === undefined) {
    return '-';
  }

  if (typeof value === 'string' && value.trim() === '') {
    return '-';
  }

  return String(value);
};

export const formatPercentValue = (
  value: number | null | undefined
): string => {
  if (value === null || value === undefined) {
    return '-';
  }

  return `${value}%`;
};

export const buildMetricCards = (
  data: DashboardResponse,
  videoDurationSec?: number
): MetricCardItem[] => {
  const { insights } = data;

  return [
    {
      label: '참여자 수',
      value: `${data.participant_count}명`,
      sub: '누적 모집',
      color: 'var(--text)',
    },
    {
      label: '평균 주시 시간',
      value: formatDisplayValue(insights.gaze.maxDwellTime),
      sub: videoDurationSec
        ? `/ ${videoDurationSec}초 영상`
        : formatDisplayValue(insights.gaze.maxGazeRange),
      color: 'var(--accent)',
    },
    {
      label: '평균 집중도',
      value: formatPercentValue(insights.attentionPercent),
      sub: 'EEG 베타파 기반',
      color: 'var(--success)',
    },
    {
      label: '광고 회상률',
      value: formatPercentValue(insights.recallRate),
      sub: '사후 설문',
      color: 'var(--warn)',
    },
  ];
};

export const getMaxSceneTime = (data: DashboardResponse): number =>
  data.scenes.reduce((max, scene) => Math.max(max, scene.end), 0);
