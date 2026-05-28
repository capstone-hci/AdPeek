/**
 * components/SummaryGroup.tsx — 데이터 요약 그룹.
 */
import { DASHBOARD_COPY } from '../constants/copy';

type SummaryGroupProps = {
  title: string;
};

const SummaryGroup = ({ title }: SummaryGroupProps) => (
  <div style={{ marginBottom: 20 }}>
    <div
      style={{
        fontSize: 11,
        color: 'var(--text3)',
        fontWeight: 700,
        letterSpacing: '0.06em',
        marginBottom: 10,
      }}
    >
      {title}
    </div>

    <div
      style={{
        background: 'var(--bg2)',
        borderRadius: 10,
        padding: '14px 16px',
        fontSize: 13,
        color: 'var(--text2)',
        lineHeight: 1.6,
      }}
    >
      {DASHBOARD_COPY.summary.placeholder}
    </div>
  </div>
);

export default SummaryGroup;
