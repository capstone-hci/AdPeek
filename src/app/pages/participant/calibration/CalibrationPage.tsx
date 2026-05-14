import { useLocation } from 'react-router-dom';

type ParticipantConsentState = {
  name: string;
  age: string;
  agreements: {
    privacy: boolean;
    biometric: boolean;
    research: boolean;
  };
};

export default function HomePage() {
  const { state } = useLocation();
  const consent = state as ParticipantConsentState | null;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        padding: 40,
        animation: 'fadeIn 0.4s ease',
      }}
    >
      <p style={{ fontSize: 14, color: 'var(--text2)' }}>
        STEP 2 / 5 (준비 중)
      </p>
      {consent?.name ? (
        <p style={{ marginTop: 12, fontSize: 15 }}>
          {consent.name}님, 동의가 완료되었습니다.
        </p>
      ) : null}
    </div>
  );
}
