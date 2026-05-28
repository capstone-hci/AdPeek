/**
 * components/MetricCardGrid.tsx — 지표 카드 그리드.
 */
import { METRIC_CARDS } from '../constants/metrics';
import MetricCard from './MetricCard';

const MetricCardGrid = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14,
    }}
  >
    {METRIC_CARDS.map((item) => (
      <MetricCard key={item.label} {...item} />
    ))}
  </div>
);

export default MetricCardGrid;
