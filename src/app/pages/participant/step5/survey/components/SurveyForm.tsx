/**
 * components/SurveyForm.tsx — 설문 문항 폼 영역.
 */
import {
  isSurveyComplete,
  type EmotionAnswer,
  type RecallAnswer,
  type SurveyAnswers,
} from '../types/survey';
import EmotionQuestion from './EmotionQuestion';
import OpinionQuestion from './OpinionQuestion';
import PreferenceQuestion from './PreferenceQuestion';
import RecallQuestion from './RecallQuestion';
import SurveyActions from './SurveyActions';

type SurveyFormProps = {
  answers: SurveyAnswers;
  onRecallChange: (value: RecallAnswer) => void;
  onPreferenceChange: (value: number) => void;
  onEmotionChange: (value: EmotionAnswer) => void;
  onOpinionChange: (value: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
};

const SurveyForm = ({
  answers,
  onRecallChange,
  onPreferenceChange,
  onEmotionChange,
  onOpinionChange,
  onPrev,
  onSubmit,
}: SurveyFormProps) => {
  const canSubmit = isSurveyComplete(answers);

  return (
    <main
      style={{
        background: 'var(--surface)',
        borderRadius: 18,
        boxShadow: 'inset 0 0 0 1px var(--border2)',
        padding: 32,
      }}
    >
      <RecallQuestion value={answers.recall} onChange={onRecallChange} />
      <PreferenceQuestion
        value={answers.preference}
        onChange={onPreferenceChange}
      />
      <EmotionQuestion value={answers.emotion} onChange={onEmotionChange} />
      <OpinionQuestion value={answers.opinion} onChange={onOpinionChange} />
      <SurveyActions
        canSubmit={canSubmit}
        onPrev={onPrev}
        onSubmit={onSubmit}
      />
    </main>
  );
};

export default SurveyForm;
