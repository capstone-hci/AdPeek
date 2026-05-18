import { useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.5s ease',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          width: 'min(100%, 1120px)',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '5px 10px',
            borderRadius: 999,
            background: 'var(--accent-soft)',
            color: 'var(--accent)',
          }}
        >
          광고 반응 분석 시스템
        </span>

        <h1
          style={{
            width: '100%',
            fontSize: 50,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            marginTop: 14,
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          보는 곳을 알면
          <br />
          마음이 보입니다
        </h1>

        <p
          style={{
            width: '100%',
            color: 'var(--text2)',
            fontSize: 15,
            lineHeight: 1.65,
            marginBottom: 36,
            maxWidth: 480,
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
        >
          시선과 뇌파로 광고의 어떤 장면이 시청자의 주목과 감정 반응을
          이끌어냈는지 <br /> 정량적으로 분석합니다.
        </p>

        <div className="mx-auto grid w-full max-w-[800px] grid-cols-1 gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => navigate(paths.consent)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
            }}
            style={{
              background: 'var(--surface)',
              borderRadius: 16,
              padding: 24,
              textAlign: 'left',
              boxShadow: 'var(--shadow-xs)',
              outline: '1px solid var(--border)',
              cursor: 'pointer',
              transition:
                'transform 0.2s var(--ease), box-shadow 0.2s var(--ease)',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'var(--accent-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="9"
                  r="4"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                <path
                  d="M4 20C4 16.5 7 14 12 14C17 14 20 16.5 20 20"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: '0.06em',
                marginBottom: 5,
              }}
            >
              실험 참여자
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: 6,
              }}
            >
              광고를 시청하고
              <br />
              실험에 참여합니다
            </div>

            <div
              style={{
                fontSize: 13,
                color: 'var(--text3)',
                lineHeight: 1.55,
                marginBottom: 18,
              }}
            >
              Muse 헤드밴드 착용 후 시작하세요.
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--accent)',
              }}
            >
              참여 시작하기
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7H11M11 7L7 3M11 7L7 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate(paths.dashboard)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
            }}
            style={{
              background: '#191f28',
              borderRadius: 16,
              padding: 24,
              textAlign: 'left',
              boxShadow: 'var(--shadow-xs)',
              cursor: 'pointer',
              transition:
                'transform 0.2s var(--ease), box-shadow 0.2s var(--ease)',
              color: '#fff',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                <rect
                  x="2"
                  y="3"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <path
                  d="M6 12L9 9L12 12L16 7"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#7ea7ff',
                letterSpacing: '0.06em',
                marginBottom: 5,
              }}
            >
              마케터 · 분석가
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: 6,
              }}
            >
              참여자 결과를 모아
              <br />
              인사이트를 확인합니다
            </div>

            <div
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.55,
                marginBottom: 18,
              }}
            >
              광고별 시선 히트맵, EEG 타임라인, 회상률·구매 의향을 통합
              대시보드에서 확인하세요.
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 13,
                fontWeight: 600,
                color: '#7ea7ff',
              }}
            >
              대시보드 바로가기
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7H11M11 7L7 3M11 7L7 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>

        <div
          style={{
            marginTop: 36,
            display: 'flex',
            gap: 28,
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          {[
            ['12명', '누적 참여자'],
            ['3편', '분석 광고'],
            ['72%', '평균 집중도'],
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: 'var(--text)',
                  letterSpacing: '-0.03em',
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text3)',
                  marginTop: 2,
                  fontWeight: 500,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartPage;
