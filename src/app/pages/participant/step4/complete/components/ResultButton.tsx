/**
 * components/ResultButton.tsx — 「분석 결과 보기」 CTA 버튼.
 */
import { COMPLETE_COPY } from '../constants/copy';

type ResultButtonProps = {
  onClick: () => void;
};

const ResultButton = ({ onClick }: ResultButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      border: 'none',
      background: 'var(--accent)',
      color: '#fff',
      padding: '15px 28px',
      borderRadius: 10,
      fontSize: 16,
      fontWeight: 600,
      width: 'auto',
      letterSpacing: '-0.02em',
      transition: 'background 0.15s var(--ease), transform 0.1s var(--ease)',
      cursor: 'pointer',
    }}
  >
    {COMPLETE_COPY.resultButton}
  </button>
);

export default ResultButton;
