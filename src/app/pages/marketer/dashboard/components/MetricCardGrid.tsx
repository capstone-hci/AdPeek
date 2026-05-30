/**
 * components/MetricCardGrid.tsx — 지표 카드 그리드.
 */
import type { Campaign, DashboardResponse } from '../types/dashboard';
import { buildMetricCards } from '../utils/dashboardFormat';
import MetricCard from './MetricCard';

type MetricCardGridProps = {
  campaign: Campaign;
  dashboard?: DashboardResponse;
  isPending: boolean;
  isError: boolean;
};

const PLACEHOLDER_METRICS = [
  { label: '참여자 수', value: '…', sub: '누적 모집', color: 'var(--text4)' },
  {
    label: '평균 주시 시간',
    value: '…',
    sub: '/ 30초 영상',
    color: 'var(--text4)',
  },
  {
    label: '평균 집중도',
    value: '…',
    sub: 'EEG 베타파 기반',
    color: 'var(--text4)',
  },
  {
    label: '광고 회상률',
    value: '…',
    sub: '사후 설문',
    color: 'var(--text4)',
  },
];

const MetricCardGrid = ({
  campaign,
  dashboard,
  isPending,
  isError,
}: MetricCardGridProps) => {
  const metrics = dashboard
    ? buildMetricCards(dashboard, campaign.durationSec)
    : isPending
      ? PLACEHOLDER_METRICS.map((item) => ({
          ...item,
          sub:
            item.label === '평균 주시 시간'
              ? `/ ${campaign.durationSec}초 영상`
              : item.sub,
        }))
      : PLACEHOLDER_METRICS.map((item) => ({ ...item, value: '-' }));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 14,
      }}
    >
      {metrics.map((item) => (
        <MetricCard key={item.label} {...item} />
      ))}
      {isError && (
        <div
          style={{
            gridColumn: '1 / -1',
            fontSize: 13,
            color: 'var(--danger)',
          }}
        >
          대시보드 데이터를 불러오지 못했습니다.
        </div>
      )}
    </div>
  );
};

export default MetricCardGrid;
