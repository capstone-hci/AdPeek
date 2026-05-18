type ConnectionActionsProps = {
  isConnected: boolean;
  onPrev: () => void;
  onNext: () => void;
};

const ConnectionActions = (props: ConnectionActionsProps) => {
  const { isConnected, onPrev, onNext } = props;

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <button
        type="button"
        onClick={onPrev}
        style={{
          border: 'none',
          color: 'var(--text2)',
          padding: '15px 24px',
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          background: 'var(--surface)',
          boxShadow: 'inset 0 0 0 1px var(--border)',
          letterSpacing: '-0.02em',
          cursor: 'pointer',
        }}
      >
        이전
      </button>

      <div style={{ flex: 1 }}>
        <button
          type="button"
          disabled={!isConnected}
          onClick={onNext}
          style={{
            border: 'none',
            background: isConnected ? 'var(--accent)' : 'var(--bg2)',
            color: isConnected ? '#fff' : 'var(--text4)',
            padding: '15px 28px',
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 600,
            width: '100%',
            letterSpacing: '-0.02em',
            transition:
              'background 0.15s var(--ease), transform 0.1s var(--ease)',
            cursor: isConnected ? 'pointer' : 'not-allowed',
          }}
        >
          다음 단계
        </button>
      </div>
    </div>
  );
};

export default ConnectionActions;
