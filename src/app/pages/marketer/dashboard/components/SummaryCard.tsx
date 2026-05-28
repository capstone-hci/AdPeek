/**
 * components/SummaryCard.tsx — 데이터 요약 사이드 카드.
 */
import { DASHBOARD_COPY } from '../constants/copy';
import SummaryGroup from './SummaryGroup';

const SummaryCard = () => (
  <aside
    style={{
      background: 'var(--surface)',
      borderRadius: 18,
      padding: 24,
      boxShadow: 'inset 0 0 0 1px var(--border2)',
      alignSelf: 'start',
    }}
  >
    <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 18 }}>
      {DASHBOARD_COPY.summary.title}
    </h3>

    {DASHBOARD_COPY.summary.groups.map((title) => (
      <SummaryGroup key={title} title={title} />
    ))}
  </aside>
);

export default SummaryCard;
