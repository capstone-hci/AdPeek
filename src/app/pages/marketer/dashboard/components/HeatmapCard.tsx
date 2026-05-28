/**
 * components/HeatmapCard.tsx — 시선 히트맵 카드.
 */
import { DASHBOARD_COPY } from '../constants/copy';
import { HEATMAP_SPOTS } from '../constants/heatmap';

const HeatmapCard = () => (
  <section
    style={{
      background: 'var(--surface)',
      borderRadius: 18,
      padding: 24,
      boxShadow: 'inset 0 0 0 1px var(--border2)',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}
    >
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 800 }}>
          {DASHBOARD_COPY.heatmap.title}
        </h3>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
          {DASHBOARD_COPY.heatmap.subtitle}
        </div>
      </div>
      <button
        type="button"
        style={{
          background: 'transparent',
          color: 'var(--accent)',
          cursor: 'pointer',
        }}
      >
        {DASHBOARD_COPY.heatmap.timelineLink}
      </button>
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
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgb(176,184,193)',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {DASHBOARD_COPY.heatmap.frameLabel}
      </div>

      {HEATMAP_SPOTS.map((spot, index) => (
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
            opacity: 0.65,
            mixBlendMode: 'multiply',
          }}
        />
      ))}
    </div>

    <div
      style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}
    >
      <span style={{ fontSize: 11, color: 'var(--text3)' }}>
        {DASHBOARD_COPY.heatmap.legendLow}
      </span>
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: 3,
          background:
            'linear-gradient(to right, rgba(139,92,246,0.4), rgba(245,158,11,0.7), rgba(240,68,82,0.9))',
        }}
      />
      <span style={{ fontSize: 11, color: 'var(--text3)' }}>
        {DASHBOARD_COPY.heatmap.legendHigh}
      </span>
    </div>
  </section>
);

export default HeatmapCard;
