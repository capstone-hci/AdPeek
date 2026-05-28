/**
 * components/DashboardSidebar.tsx — 좌측 캠페인·프로필 사이드바.
 */
import { CAMPAIGNS } from '../constants/campaigns';
import { DASHBOARD_COPY } from '../constants/copy';

const DashboardSidebar = () => (
  <aside
    style={{
      width: 280,
      background: 'var(--surface)',
      borderRight: '1px solid var(--border2)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh',
    }}
  >
    <div
      style={{
        padding: '20px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" fill="white" />
          <path
            d="M2 12C2 12 6 5 12 5C18 5 22 12 22 12C22 12 18 19 12 19C6 19 2 12 2 12Z"
            stroke="white"
            strokeWidth={1.8}
            fill="none"
          />
        </svg>
      </div>
      <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em' }}>
        {DASHBOARD_COPY.brand}
      </div>
    </div>

    <div
      style={{
        padding: '8px 22px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: 'var(--text3)',
          fontWeight: 700,
          letterSpacing: '0.06em',
        }}
      >
        {DASHBOARD_COPY.campaigns}
      </span>
      <button
        type="button"
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          background: 'var(--bg2)',
          cursor: 'pointer',
        }}
      >
        +
      </button>
    </div>

    <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
      {CAMPAIGNS.map((campaign) => (
        <button
          key={campaign.name}
          type="button"
          style={{
            width: '100%',
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            cursor: 'pointer',
            background: campaign.active ? 'var(--accent-soft)' : 'transparent',
            marginBottom: 4,
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: campaign.color,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M5 3L14 9L5 15V3Z" fill="white" opacity="0.9" />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: campaign.active ? 'var(--accent)' : 'var(--text)',
                marginBottom: 2,
              }}
            >
              {campaign.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>
              {campaign.meta}
            </div>
          </div>

          {campaign.active && (
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent)',
              }}
            />
          )}
        </button>
      ))}
    </div>

    <div
      style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border2)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'var(--accent)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {DASHBOARD_COPY.user.initial}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>
          {DASHBOARD_COPY.user.name}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>
          {DASHBOARD_COPY.user.org}
        </div>
      </div>
    </div>
  </aside>
);

export default DashboardSidebar;
