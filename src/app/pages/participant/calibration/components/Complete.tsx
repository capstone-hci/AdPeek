type CompleteProps = {
  onRetry: () => void;
  onNext: () => void;
};

const Complete = (props: CompleteProps) => {
  const { onRetry, onNext } = props;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        padding: '40px 48px',
        animation: 'fadeIn 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 18,
            boxShadow: 'inset 0 0 0 1px var(--border2)',
            padding: '48px 40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              background: 'rgb(230, 247, 238)',
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle
                cx="14"
                cy="14"
                r="12"
                fill="var(--success)"
                opacity="0.2"
              />
              <path
                d="M8 14L12 18L20 10"
                stroke="var(--success)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            캘리브레이션 완료!
          </h3>

          <p
            style={{
              color: 'var(--text2)',
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            시선추적 정밀도:{' '}
            <strong style={{ color: 'var(--success)' }}>94.7%</strong>
          </p>

          <p
            style={{
              color: 'var(--text3)',
              fontSize: 13,
              marginBottom: 28,
            }}
          >
            매우 좋은 상태입니다. 다음 단계로 진행해주세요.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 8,
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              onClick={onRetry}
              style={{
                border: 'none',
                color: 'var(--text2)',
                padding: '15px 24px',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                background: 'var(--surface)',
                boxShadow: 'inset 0 0 0 1px var(--border)',
                transition: 'background 0.15s var(--ease)',
                letterSpacing: '-0.02em',
                cursor: 'pointer',
              }}
            >
              다시 하기
            </button>

            <button
              type="button"
              onClick={onNext}
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
                transition:
                  'background 0.15s var(--ease), transform 0.1s var(--ease)',
                cursor: 'pointer',
              }}
            >
              다음 단계
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complete;
