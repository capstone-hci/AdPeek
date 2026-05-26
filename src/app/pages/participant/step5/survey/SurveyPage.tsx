/**
 * SurveyPage — 참여자 step5 사후 설문 페이지.
 */
import { useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';
import SurveyForm from './components/SurveyForm';
import SurveySidebar from './components/SurveySidebar';
import { useSurveyForm } from './hooks/useSurveyForm';

const SurveyPage = () => {
  const navigate = useNavigate();
  const { answers, setRecall, setPreference, setEmotion, setOpinion } =
    useSurveyForm();

  const handlePrev = () => {
    navigate(paths.step4.complete);
  };

  const handleSubmit = () => {
    // TODO: API 연동 시 answers 전송
    navigate(paths.step5.complete);
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
          gridTemplateColumns: '0.8fr 1.2fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <SurveySidebar />
        <SurveyForm
          answers={answers}
          onRecallChange={setRecall}
          onPreferenceChange={setPreference}
          onEmotionChange={setEmotion}
          onOpinionChange={setOpinion}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SurveyPage;
