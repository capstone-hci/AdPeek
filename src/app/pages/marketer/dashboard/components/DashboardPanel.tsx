/**
 * components/DashboardPanel.tsx — 분석 패널 플레이스홀더.
 */
type DashboardPanelProps = {
  title: string;
  description: string;
  placeholder: string;
  minHeight?: number;
};

const DashboardPanel = ({
  title,
  description,
  placeholder,
  minHeight = 220,
}: DashboardPanelProps) => (
  <section
    style={{
      background: 'var(--surface)',
      borderRadius: 16,
      boxShadow: 'inset 0 0 0 1px var(--border2)',
      padding: 22,
    }}
  >
    <div style={{ marginBottom: 16 }}>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: 4,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 12, color: 'var(--text3)' }}>{description}</p>
    </div>

    <div
      style={{
        minHeight,
        borderRadius: 12,
        background: 'var(--bg)',
        border: '1.5px dashed var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text4)',
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {placeholder}
    </div>
  </section>
);

export default DashboardPanel;
