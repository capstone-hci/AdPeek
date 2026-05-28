/**
 * components/DashboardOverview.tsx — 종합 탭 본문(지표·차트).
 */
import EegTimelineCard from './EegTimelineCard';
import HeatmapCard from './HeatmapCard';
import MetricCardGrid from './MetricCardGrid';
import SummaryCard from './SummaryCard';

const DashboardOverview = () => (
  <div style={{ padding: '28px 36px 60px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <MetricCardGrid />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <HeatmapCard />
          <EegTimelineCard />
        </div>

        <SummaryCard />
      </div>
    </div>
  </div>
);

export default DashboardOverview;
