import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';
import Calibration from './components/Calibration';
import Complete from './components/Complete';
import Intro from './components/Intro';

type ParticipantConsentState = {
  name: string;
  age: string;
  gender: 'male' | 'female';
  agreements: {
    privacy: boolean;
    biometric: boolean;
    research: boolean;
  };
};

/** Step 2 내부: 안내 → 캘리브레이션 → 완료 */
type CalibrationSubStep = 0 | 1 | 2;

export default function CalibrationPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const participant = state as ParticipantConsentState | null;

  const [subStep, setSubStep] = useState<CalibrationSubStep>(0);

  const goConsent = () => {
    navigate(paths.consent, { state: participant ?? undefined });
  };

  const goNextExperimentStep = () => {
    navigate(paths.home);
  };

  if (subStep === 0) {
    return <Intro onPrev={goConsent} onStart={() => setSubStep(1)} />;
  }

  if (subStep === 1) {
    return (
      <Calibration
        onPrev={() => setSubStep(0)}
        onComplete={() => setSubStep(2)}
      />
    );
  }

  return (
    <Complete onRetry={() => setSubStep(1)} onNext={goNextExperimentStep} />
  );
}
