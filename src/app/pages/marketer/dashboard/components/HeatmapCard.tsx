/**
 * components/HeatmapCard.tsx — 시선 히트맵 카드.
 */
import { DASHBOARD_COPY } from '../constants/copy';
import type { DashboardResponse } from '../types/dashboard';
import { getMaxSceneTime } from '../utils/dashboardFormat';
import { buildHeatmapSpots } from '../utils/heatmapVisualize';

type HeatmapCardProps = {
  dashboard?: DashboardResponse;
  isPending: boolean;
  isError: boolean;
};

const GRID_COLS = 3;
const GRID_ROWS = 3;
const GRID_LINE_COLOR = 'rgba(176, 184, 193, 0.55)';

const HeatmapCard = ({ dashboard, isPending, isError }: HeatmapCardProps) => {
  const maxTime = dashboard ? getMaxSceneTime(dashboard) : 0;
  const spots = dashboard ? buildHeatmapSpots(dashboard.heatmap_data) : [];

  return (
    <section
      style={{
        background: 'var(--surface)',
        borderRadius: 18,
        padding: 24,
        boxShadow: 'inset 0 0 0 1px var(--border2)',
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          {DASHBOARD_COPY.heatmap.title}
        </h3>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
          {dashboard
            ? `전체 참여자 평균 · 0–${maxTime.toFixed(0)}s`
            : DASHBOARD_COPY.heatmap.subtitle}
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          background: 'rgb(242,244,246)',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            boxShadow: `inset 0 0 0 1px ${GRID_LINE_COLOR}`,
            backgroundImage: `
              linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px),
              linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)
            `,
            backgroundSize: `${100 / GRID_COLS}% ${100 / GRID_ROWS}%`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {!dashboard && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgb(176,184,193)',
              fontSize: 14,
              fontWeight: 500,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {isPending
              ? '히트맵 불러오는 중…'
              : isError
                ? '히트맵을 불러오지 못했습니다.'
                : DASHBOARD_COPY.heatmap.frameLabel}
          </div>
        )}

        {dashboard && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgb(176,184,193)',
              fontSize: 14,
              fontWeight: 500,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {DASHBOARD_COPY.heatmap.frameLabel}
          </div>
        )}

        {dashboard && spots.length === 0 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgb(176,184,193)',
              fontSize: 14,
              fontWeight: 500,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            시선 데이터가 없습니다.
          </div>
        )}

        {spots.map((spot, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: spot.left,
              top: spot.top,
              width: spot.size,
              height: spot.size,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${spot.color} 0%, transparent 70%)`,
              opacity: spot.opacity,
              mixBlendMode: 'multiply',
              zIndex: 3,
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 14,
          fontSize: 11,
          color: 'var(--text3)',
        }}
      >
        <span>{DASHBOARD_COPY.heatmap.legendLow}</span>
        <div
          style={{
            flex: 1,
            height: 6,
            borderRadius: 3,
            background:
              'linear-gradient(to right, rgba(139,92,246,0.4), rgba(245,158,11,0.7), rgba(240,68,82,0.9))',
          }}
        />
        <span>{DASHBOARD_COPY.heatmap.legendHigh}</span>
      </div>
    </section>
  );
};

export default HeatmapCard;
