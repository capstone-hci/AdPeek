import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';

const channels = [
  { name: 'AF7', color: '#4a90d9' },
  { name: 'AF8', color: '#7c5cbf' },
  { name: 'TP9', color: '#2db87a' },
  { name: 'TP10', color: '#e8a020' },
];

const checklist = [
  '헤드밴드 착용 확인',
  '전원 버튼 2초 이상 누름',
  'LED 표시등 깜빡임 확인',
  'Bluetooth 활성화됨',
];

const CheckIcon = () => (
  <svg width="10" height="8" viewBox="0 0 10 8">
    <path
      d="M1 3.5L3.5 6L9 1"
      stroke="white"
      strokeWidth={1.8}
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const HeadbandGuide = () => (
  <svg width="100%" height="140" viewBox="0 0 200 140" fill="none">
    <ellipse
      cx="100"
      cy="80"
      rx="60"
      ry="42"
      stroke="var(--text3)"
      strokeWidth={1.5}
      opacity={0.4}
    />
    <path
      d="M40 70C40 40 70 25 100 25C130 25 160 40 160 70"
      stroke="var(--accent2)"
      strokeWidth={3}
      strokeLinecap="round"
    />
    <circle cx="75" cy="40" r="5" fill="var(--accent2)" />
    <circle cx="125" cy="40" r="5" fill="var(--accent2)" />
    <circle cx="42" cy="78" r="5" fill="var(--accent2)" opacity={0.7} />
    <circle cx="158" cy="78" r="5" fill="var(--accent2)" opacity={0.7} />
    <text x="75" y="30" textAnchor="middle" fontSize={9} fill="var(--text3)">
      AF7
    </text>
    <text x="125" y="30" textAnchor="middle" fontSize={9} fill="var(--text3)">
      AF8
    </text>
    <text x="30" y="82" textAnchor="middle" fontSize={9} fill="var(--text3)">
      TP9
    </text>
    <text x="172" y="82" textAnchor="middle" fontSize={9} fill="var(--text3)">
      TP10
    </text>
  </svg>
);

const MuseIcon = () => (
  <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
    <path
      d="M3 12C3 7 7 3 15 3C23 3 27 7 27 12"
      stroke="var(--accent2)"
      strokeWidth={2.5}
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="3" cy="13" r="3" fill="var(--accent2)" opacity={0.7} />
    <circle cx="27" cy="13" r="3" fill="var(--accent2)" opacity={0.7} />
    <line
      x1="3"
      y1="13"
      x2="8"
      y2="13"
      stroke="var(--accent2)"
      strokeWidth={1.5}
    />
    <line
      x1="22"
      y1="13"
      x2="27"
      y2="13"
      stroke="var(--accent2)"
      strokeWidth={1.5}
    />
  </svg>
);

const WAVE_LENGTH = 48;

const createInitialWave = (channelIndex: number) =>
  Array.from({ length: WAVE_LENGTH }, (_, index) => {
    return 20 + Math.sin(index * 0.5 + channelIndex) * 8;
  });

const makeWavePoints = (history: number[]) =>
  history
    .map((y, index) => {
      const x = (index / (history.length - 1)) * 100;
      return `${x},${y}`;
    })
    .join(' ');

const ConnectionPage = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [channelValues, setChannelValues] = useState([27, 64, 31, 52]);
  const [waveData, setWaveData] = useState(() =>
    channels.map((_, index) => createInitialWave(index))
  );

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setChannelValues((prev) => {
        const next = prev.map((value) => {
          const updated = value + (Math.random() * 8 - 4);
          return Math.max(15, Math.min(80, Math.round(updated)));
        });

        setWaveData((waves) =>
          waves.map((history, index) => {
            const amplitude = ((next[index] - 47.5) / 32.5) * 11;
            const noise = (Math.random() - 0.5) * 4;
            const y = 20 + amplitude + noise;
            const clamped = Math.max(4, Math.min(36, y));

            return [...history.slice(1), clamped];
          })
        );

        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isConnected]);

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
          gridTemplateColumns: '0.85fr 1.15fr',
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
            STEP 3 / 5
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
            Muse 헤드밴드
            <br />
            연결
          </h2>

          <p
            style={{
              color: 'var(--text2)',
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            전두엽(AF7·AF8)과 측두엽(TP9·TP10) 4채널에서 뇌파를 측정합니다. 연결
            전 헤드밴드가 머리에 밀착되어 있는지 확인해주세요.
          </p>

          <div
            style={{
              background: 'var(--bg2)',
              borderRadius: 16,
              padding: 24,
              marginBottom: 16,
            }}
          >
            <HeadbandGuide />
            <div
              style={{
                fontSize: 12,
                color: 'var(--text3)',
                textAlign: 'center',
                marginTop: 8,
              }}
            >
              4채널 EEG 센서 위치
            </div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.7 }}>
            연결이 안 되시나요? 헤드밴드 전원을 다시 켜고, 센서 패드에 약간의
            물을 묻혀 피부 접촉을 개선해보세요.
          </div>
        </aside>

        <div style={{ width: '100%' }}>
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 18,
              boxShadow: 'inset 0 0 0 1px var(--border2)',
              padding: 28,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgb(240, 234, 250)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MuseIcon />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>
                  Muse S (Gen 2)
                </div>
                <div
                  style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}
                >
                  4채널 EEG · Bluetooth LE
                </div>
              </div>

              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  background: isConnected ? 'rgb(230, 247, 238)' : 'var(--bg2)',
                  color: isConnected ? 'var(--success)' : 'var(--text3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: isConnected ? 'var(--success)' : 'var(--text3)',
                  }}
                />
                {isConnected ? '연결됨' : '연결 안됨'}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                marginBottom: isConnected ? 0 : 20,
              }}
            >
              {checklist.map((text, index) => {
                const checked = isConnected || index !== 2;

                return (
                  <div
                    key={text}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: 13,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: checked
                          ? 'var(--success)'
                          : 'var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {checked ? (
                        <CheckIcon />
                      ) : (
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            background: 'var(--text3)',
                          }}
                        />
                      )}
                    </div>

                    <span
                      style={{
                        color: checked ? 'var(--text)' : 'var(--text3)',
                      }}
                    >
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>

            {!isConnected && (
              <button
                type="button"
                onClick={() => setIsConnected(true)}
                style={{
                  border: 'none',
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '15px 28px',
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 600,
                  width: '100%',
                  letterSpacing: '-0.02em',
                  transition:
                    'background 0.15s var(--ease), transform 0.1s var(--ease)',
                  cursor: 'pointer',
                }}
              >
                장치 연결하기
              </button>
            )}
          </div>

          {isConnected && (
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: 18,
                boxShadow: 'inset 0 0 0 1px var(--border2)',
                padding: 28,
                marginBottom: 16,
                animation: 'fadeIn 0.4s ease',
              }}
            >
              <h4
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 16,
                  color: 'var(--text2)',
                }}
              >
                EEG 채널 신호 상태
              </h4>

              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                {channels.map((channel, index) => (
                  <div
                    key={channel.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: channel.color,
                        width: 32,
                        flexShrink: 0,
                      }}
                    >
                      {channel.name}
                    </span>

                    <div
                      style={{
                        flex: 1,
                        background: 'rgb(248, 248, 246)',
                        borderRadius: 6,
                        overflow: 'hidden',
                      }}
                    >
                      <svg
                        width="100%"
                        height="40"
                        viewBox="0 0 100 40"
                        preserveAspectRatio="none"
                      >
                        <polyline
                          points={makeWavePoints(waveData[index])}
                          stroke={channel.color}
                          strokeWidth={1.5}
                          fill="none"
                          opacity={0.8}
                        />
                      </svg>
                    </div>

                    <span
                      style={{
                        fontSize: 11,
                        color: 'var(--text3)',
                        width: 48,
                        textAlign: 'right',
                      }}
                    >
                      {channelValues[index]} μV
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              onClick={() => navigate(paths.calibration)}
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
                onClick={() => navigate(paths.home)}
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
        </div>
      </div>
    </div>
  );
};

export default ConnectionPage;
