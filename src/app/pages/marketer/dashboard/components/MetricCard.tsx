/**
 * components/MetricCard.tsx — 지표 카드.
 */
import type { MetricCardItem } from '../types/dashboard';

type MetricCardProps = MetricCardItem;

const MetricCard = ({ label, value, sub, color }: MetricCardProps) => (
  <div
    style={{
      background: 'var(--surface)',
      borderRadius: 14,
      padding: '18px 20px',
      boxShadow: 'inset 0 0 0 1px var(--border2)',
    }}
  >
    <div
      style={{
        fontSize: 12,
        color: 'var(--text3)',
        fontWeight: 600,
        marginBottom: 8,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontSize: 26,
        fontWeight: 800,
        letterSpacing: '-0.03em',
        color,
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
      {sub}
    </div>
  </div>
);

export default MetricCard;
