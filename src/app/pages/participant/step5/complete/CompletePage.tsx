/**
 * CompletePage — 참여자 step5 최종 완료 페이지.
 */
import { useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';

const SUMMARY_ITEMS = [
  { value: '30초', label: '시청 시간' },
  { value: '9점', label: '캘리브레이션' },
  { value: '100%', label: '데이터 수집' },
] as const;

const CompletePage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate(paths.home);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        animation: 'fadeIn 0.5s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 540,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 28,
            background: 'var(--success-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M10 20L17 27L30 13"
              stroke="var(--success)"
              strokeWidth={3.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 14,
          }}
        >
          실험에 참여해주셔서
          <br />
          감사합니다
        </h1>

        <p
          style={{
            color: 'var(--text2)',
            fontSize: 16,
            lineHeight: 1.7,
            marginBottom: 36,
          }}
        >
          시선·뇌파 데이터가 안전하게 수집되었습니다.
          <br />
          연구 결과는 익명으로 처리되어 분석에 활용됩니다.
        </p>

        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 28,
            boxShadow: 'inset 0 0 0 1px var(--border2)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 20,
            }}
          >
            {SUMMARY_ITEMS.map((item) => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: 'var(--accent)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--text3)',
                    marginTop: 4,
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p
          style={{
            color: 'var(--text3)',
            fontSize: 13,
            marginBottom: 28,
            lineHeight: 1.7,
          }}
        >
          Muse 헤드밴드를 조심스럽게 벗어 진행자에게 반납해주세요.
        </p>

        <button
          type="button"
          onClick={handleHome}
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
          처음 화면으로
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
