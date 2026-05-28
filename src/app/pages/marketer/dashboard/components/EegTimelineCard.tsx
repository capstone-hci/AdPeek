/**
 * components/EegTimelineCard.tsx — EEG 타임라인 카드.
 */
import { DASHBOARD_COPY } from '../constants/copy';

const EegTimelineCard = () => (
  <section
    style={{
      background: 'var(--surface)',
      borderRadius: 18,
      padding: 24,
      boxShadow: 'inset 0 0 0 1px var(--border2)',
    }}
  >
    <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>
      {DASHBOARD_COPY.eeg.title}
    </h3>

    <svg width="100%" viewBox="0 0 720 180" style={{ display: 'block' }}>
      <line
        x1="30"
        y1="150"
        x2="700"
        y2="150"
        stroke="#e5e8eb"
        strokeWidth={1}
      />
      <path
        d="M30,117 L78,108 L126,98 L174,78 L221,61 L269,48 L317,39 L365,43 L413,59 L461,72 L509,78 L556,74 L604,65 L652,59 L700,69"
        stroke="#3182f6"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M30,124 L78,118 L126,111 L174,100 L221,91 L269,78 L317,72 L365,74 L413,82 L461,87 L509,91 L556,88 L604,85 L652,81 L700,85"
        stroke="#f59e0b"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </section>
);

export default EegTimelineCard;
