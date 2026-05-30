/**
 * components/EegFocusPanel.tsx — 하단 EEG 집중도(%) 라벨·프로그레스 바 오버레이
 */
type EegFocusPanelProps = {
  focus: number;
};

const EegFocusPanel = ({ focus }: EegFocusPanelProps) => (
  <div
    style={{
      position: 'absolute',
      bottom: 14,
      left: 14,
      right: 14,
      background: 'rgba(0,0,0,0.6)',
      borderRadius: 8,
      padding: '8px 12px',
      backdropFilter: 'blur(4px)',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
      }}
    >
      <span
        style={{
          color: 'rgb(170,170,170)',
          fontSize: 11,
        }}
      >
        EEG 집중도
      </span>

      <span
        style={{
          color: '#fff',
          fontSize: 11,
          fontWeight: 600,
          marginLeft: 'auto',
        }}
      >
        {focus}%
      </span>
    </div>

    <div
      style={{
        height: 3,
        background: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${focus}%`,
          background: 'var(--accent)',
          borderRadius: 2,
          transition: 'width 0.3s',
        }}
      />
    </div>
  </div>
);

export default EegFocusPanel;
