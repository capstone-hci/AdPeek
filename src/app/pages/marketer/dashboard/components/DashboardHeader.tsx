/**
 * components/DashboardHeader.tsx — 상단 제목·상태 영역.
 */
import { DASHBOARD_COPY } from '../constants/copy';
import type { Campaign } from '../types/dashboard';

type DashboardHeaderProps = {
  campaign: Campaign;
};

const DashboardHeader = ({ campaign }: DashboardHeaderProps) => (
  <header
    style={{
      padding: '24px 36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border2)',
      background: 'var(--surface)',
    }}
  >
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 12,
          color: 'var(--text3)',
          marginBottom: 4,
        }}
      >
        <span>대시보드</span>
        <span>›</span>
        <span>광고 캠페인</span>
        <span>›</span>
        <span>{campaign.name}</span>
      </div>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: '-0.03em',
        }}
      >
        {campaign.title}
      </h1>
    </div>

    <span
      style={{
        background: 'var(--success-soft)',
        color: 'var(--success)',
        borderRadius: 6,
        padding: '5px 10px',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '-0.01em',
      }}
    >
      {DASHBOARD_COPY.statusComplete}
    </span>
  </header>
);

export default DashboardHeader;
