type SummaryStatBoxProps = {
  label: string;
  value: string;
  color?: string;
};

const SummaryStatBox = ({
  label,
  value,
  color = 'var(--accent)',
}: SummaryStatBoxProps) => (
  <div
    style={{
      background: 'var(--bg2)',
      borderRadius: 10,
      padding: '16px 16px',
    }}
  >
    <div
      style={{
        fontSize: 11,
        color: 'var(--text3)',
        fontWeight: 600,
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontSize: 18,
        fontWeight: 800,
        color,
        letterSpacing: '-0.02em',
      }}
    >
      {value}
    </div>
  </div>
);

export default SummaryStatBox;
