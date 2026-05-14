import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';
import CheckBox from './components/CheckBox';

type AgreementKey = 'privacy' | 'biometric' | 'research';

const ConsentPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [agreements, setAgreements] = useState<Record<AgreementKey, boolean>>({
    privacy: false,
    biometric: false,
    research: false,
  });

  const allChecked =
    agreements.privacy && agreements.biometric && agreements.research;

  const isValid = name.trim() !== '' && age.trim() !== '' && allChecked;

  const toggleAgreement = (key: AgreementKey) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAll = () => {
    const nextValue = !allChecked;
    setAgreements({
      privacy: nextValue,
      biometric: nextValue,
      research: nextValue,
    });
  };

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
            STEP 1 / 5
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
            개인정보 수집 및
            <br />
            연구 참여 동의
          </h2>

          <p
            style={{
              color: 'var(--text2)',
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            본 실험은 광고 시청 중 발생하는 시선·뇌파 데이터를 분석합니다.
            수집되는 정보의 종류와 활용 범위를 확인해주세요.
          </p>

          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 24,
            }}
          >
            {[
              ['🔒', '암호화 보관', '모든 생체신호는 익명 ID로만 저장됩니다'],
              ['🗑', '연구 후 파기', '논문 제출 후 30일 이내 원본 데이터 삭제'],
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                style={{
                  display: 'flex',
                  gap: 14,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    flexShrink: 0,
                    width: 24,
                  }}
                >
                  {icon}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 2,
                    }}
                  >
                    {title}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--text3)',
                      lineHeight: 1.55,
                    }}
                  >
                    {desc}
                  </div>
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
              padding: 28,
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              참여자 정보
            </h3>

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 2 }}>
                <label
                  style={{
                    fontSize: 12,
                    color: 'var(--text3)',
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  이름
                </label>

                <input
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1.5px solid var(--border)',
                    fontSize: 14,
                    outline: 'none',
                    background: 'var(--bg)',
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontSize: 12,
                    color: 'var(--text3)',
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  나이
                </label>

                <input
                  placeholder="24"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1.5px solid var(--border)',
                    fontSize: 14,
                    outline: 'none',
                    background: 'var(--bg)',
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 18,
              boxShadow: 'inset 0 0 0 1px var(--border2)',
              padding: 28,
              marginBottom: 24,
            }}
          >
            <div
              onClick={toggleAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                borderRadius: 10,
                cursor: 'pointer',
                background: allChecked ? 'var(--accent-soft)' : 'var(--bg2)',
                border: allChecked
                  ? '1.5px solid var(--accent)'
                  : '1.5px solid var(--border)',
                marginBottom: 16,
                transition: '0.2s',
              }}
            >
              <CheckBox checked={allChecked} />
              <span style={{ fontWeight: 600, fontSize: 14 }}>전체 동의</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(
                [
                  [
                    'privacy',
                    '개인정보 수집·이용 동의 (필수)',
                    '성명, 나이 등 식별 정보 수집',
                  ],
                  [
                    'biometric',
                    '생체정보 수집·분석 동의 (필수)',
                    '시선 좌표, 뇌파 데이터 실시간 수집 및 분석',
                  ],
                  [
                    'research',
                    '연구 목적 활용 동의 (필수)',
                    '수집된 데이터는 HCI 연구 목적으로만 사용됩니다',
                  ],
                ] as const
              ).map(([key, title, desc]) => (
                <div
                  key={key}
                  onClick={() => toggleAgreement(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ marginTop: 2 }}>
                    <CheckBox checked={agreements[key]} />
                  </div>

                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--text3)',
                        marginTop: 2,
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              onClick={() => navigate(paths.start)}
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
              }}
            >
              이전
            </button>

            <div style={{ flex: 1 }}>
              <button
                type="button"
                disabled={!isValid}
                onClick={() => {
                  if (!isValid) return;
                  navigate(paths.calibration, {
                    state: { name, age, agreements },
                  });
                }}
                style={{
                  background: isValid ? 'var(--accent)' : 'var(--bg2)',
                  color: isValid ? '#fff' : 'var(--text4)',
                  padding: '15px 28px',
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 600,
                  width: '100%',
                  letterSpacing: '-0.02em',
                  transition:
                    'background 0.15s var(--ease), transform 0.1s var(--ease)',
                  cursor: isValid ? 'pointer' : 'not-allowed',
                  border: 'none',
                }}
              >
                동의하고 계속
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentPage;
