/**
 * components/DashboardHeader.tsx — 상단 제목·액션 영역.
 */
import { DASHBOARD_COPY } from '../constants/copy';

const DashboardHeader = () => (
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
      <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>
        {DASHBOARD_COPY.breadcrumb}
      </div>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: '-0.03em',
        }}
      >
        {DASHBOARD_COPY.campaignTitle}
      </h1>
    </div>

    <span
      style={{
        background: 'rgba(18, 183, 106, 0.12)',
        color: 'var(--success)',
        borderRadius: 6,
        padding: '5px 10px',
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {DASHBOARD_COPY.statusComplete}
    </span>
  </header>
);

export default DashboardHeader;
