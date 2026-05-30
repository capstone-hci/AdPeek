/**
 * components/DashboardSidebar.tsx — 좌측 캠페인·프로필 사이드바.
 */
import { getCampaignMeta } from '../constants/campaigns';
import { DASHBOARD_COPY } from '../constants/copy';
import type { Campaign } from '../types/dashboard';

type DashboardSidebarProps = {
  campaigns: Campaign[];
  selectedAdId: string;
  participantCount?: number;
  onSelect: (adId: string) => void;
};

const DashboardSidebar = ({
  campaigns,
  selectedAdId,
  participantCount,
  onSelect,
}: DashboardSidebarProps) => (
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path
            d="M5 1V9M1 5H9"
            stroke="#8b95a1"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>

    <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
      {campaigns.map((campaign) => {
        const selected = campaign.id === selectedAdId;
        const meta = getCampaignMeta(
          campaign,
          selected && participantCount !== undefined
            ? participantCount
            : undefined
        );

        return (
          <button
            key={campaign.id}
            type="button"
            onClick={() => onSelect(campaign.id)}
            style={{
              width: '100%',
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              cursor: 'pointer',
              background: selected ? 'var(--accent-soft)' : 'transparent',
              marginBottom: 4,
              textAlign: 'left',
              transition: 'background 0.15s var(--ease)',
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
                position: 'relative',
                overflow: 'hidden',
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
                  color: selected ? 'var(--accent)' : 'var(--text)',
                  letterSpacing: '-0.01em',
                  marginBottom: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {campaign.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text3)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {meta}
              </div>
            </div>

            {selected && (
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
        );
      })}
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
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' }}
        >
          {DASHBOARD_COPY.user.name}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>
          {DASHBOARD_COPY.user.org}
        </div>
      </div>
      <button
        type="button"
        title="로그아웃"
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M5 13H3C1.9 13 1 12.1 1 11V3C1 1.9 1.9 1 3 1H5M9 10L13 7L9 4M13 7H6"
            stroke="#8b95a1"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  </aside>
);

export default DashboardSidebar;
