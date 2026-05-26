type IntroProps = {
  onPrev: () => void;
  onStart: () => void;
};

const TIPS: [string, string][] = [
  ['1', '모니터에서 50–70cm 거리 유지'],
  ['2', '실내 조명을 일정하게 유지'],
  ['3', '안경 렌즈에 반사가 없는지 확인'],
  ['4', '각 점은 약 2초간 응시'],
];

const Intro = (props: IntroProps) => {
  const { onPrev, onStart } = props;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        padding: '40px 48px',
        animation: 'fadeIn 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '0.75fr 1.25fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <aside style={{ position: 'sticky', top: 40 }}>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text3)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              marginBottom: 12,
            }}
          >
            STEP 2 / 5
          </div>

          <h2
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            시선추적
            <br />
            캘리브레이션
          </h2>

          <p
            style={{
              color: 'var(--text2)',
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            화면에 9개의 점이 순서대로 나타납니다. 머리는 고정한 채 눈동자만
            움직여 각 점을 응시해주세요.
          </p>

          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 24,
            }}
          >
            {TIPS.map(([num, text]) => (
              <div
                key={num}
                style={{
                  display: 'flex',
                  gap: 12,
                  marginBottom: 14,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'var(--bg2)',
                    color: 'var(--text2)',
                    fontSize: 11,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--text2)',
                    lineHeight: 1.6,
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div style={{ width: '100%' }}>
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
                background: 'rgb(232, 242, 252)',
                borderRadius: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="5" fill="var(--accent)" />
                <path
                  d="M3 14C3 14 7.5 6 14 6C20.5 6 25 14 25 14C25 14 20.5 22 14 22C7.5 22 3 14 3 14Z"
                  stroke="var(--accent)"
                  strokeWidth="1.8"
                  fill="none"
                />
              </svg>
            </div>

            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              캘리브레이션 안내
            </h3>

            <p
              style={{
                color: 'var(--text2)',
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              화면에 9개의 점이 순서대로 나타납니다.
              <br />
              각 점이 나타날 때마다 점을 정확하게 응시해주세요.
              <br />
              점이 완전히 채워지면 다음 점으로 자동 이동합니다.
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
                  transition: 'background 0.15s var(--ease)',
                  letterSpacing: '-0.02em',
                  cursor: 'pointer',
                }}
              >
                이전
              </button>
              <button
                type="button"
                onClick={onStart}
                style={{
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
                  border: 'none',
                }}
              >
                캘리브레이션 시작
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
