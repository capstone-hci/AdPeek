/**
 * constants/metrics.ts — 지표 카드 더미 데이터.
 */
import type { MetricCardItem } from '../types/dashboard';

export const METRIC_CARDS: MetricCardItem[] = [
  { label: '참여자 수', value: '12명', sub: '누적 모집', color: 'var(--text)' },
  {
    label: '평균 주시 시간',
    value: '8.4초',
    sub: '/ 30초 영상',
    color: 'var(--accent)',
  },
  {
    label: '평균 집중도',
    value: '72%',
    sub: 'EEG 베타파 기반',
    color: 'var(--success)',
  },
  {
    label: '광고 회상률',
    value: '83%',
    sub: '사후 설문',
    color: '#f59e0b',
  },
];
