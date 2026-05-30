/**
 * components/DashboardOverview.tsx — 종합 본문(지표·차트).
 */
import type { Campaign, DashboardResponse } from '../types/dashboard';
import EegTimelineCard from './EegTimelineCard';
import HeatmapCard from './HeatmapCard';
import MetricCardGrid from './MetricCardGrid';
import SummaryCard from './SummaryCard';

type DashboardOverviewProps = {
  campaign: Campaign;
  dashboard?: DashboardResponse;
  isPending: boolean;
  isError: boolean;
};

const DashboardOverview = ({
  campaign,
  dashboard,
  isPending,
  isError,
}: DashboardOverviewProps) => (
  <div style={{ padding: '28px 36px 60px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <MetricCardGrid
        campaign={campaign}
        dashboard={dashboard}
        isPending={isPending}
        isError={isError}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 20,
          alignItems: 'stretch',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <HeatmapCard
            dashboard={dashboard}
            isPending={isPending}
            isError={isError}
          />
          <EegTimelineCard
            dashboard={dashboard}
            isPending={isPending}
            isError={isError}
          />
        </div>

        <SummaryCard
          dashboard={dashboard}
          isPending={isPending}
          isError={isError}
        />
      </div>
    </div>
  </div>
);

export default DashboardOverview;
