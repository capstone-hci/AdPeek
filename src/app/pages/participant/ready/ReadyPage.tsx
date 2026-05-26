import { useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';
import AdInfoCard from './components/AdInfoCard';
import { DUMMY_AD } from './constants/ad';

const ReadyPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(paths.step4.view);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'rgb(10, 10, 15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        animation: 'fadeIn 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: 'rgb(136, 136, 136)',
            fontSize: 12,
            letterSpacing: '0.1em',
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          STEP 4 / 5
        </div>

        <h2
          style={{
            color: '#fff',
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}
        >
          광고 시청 준비
        </h2>

        <p
          style={{
            color: 'rgb(170, 170, 170)',
            fontSize: 15,
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          광고가 시작되면 화면에 집중해주세요.
          <br />
          시선추적과 뇌파 측정이 자동으로 시작됩니다.
          <br />
          광고 시청 중 다른 행동은 삼가주세요.
        </p>

        <AdInfoCard
          name={DUMMY_AD.name}
          durationSeconds={DUMMY_AD.durationSeconds}
        />

        <button
          type="button"
          onClick={handleStart}
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
          광고 시청 시작
        </button>
      </div>
    </div>
  );
};

export default ReadyPage;
