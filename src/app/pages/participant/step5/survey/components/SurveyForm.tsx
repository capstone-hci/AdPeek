/**
 * components/SurveyForm.tsx — 설문 문항 폼 영역.
 */
import type {
  EmotionAnswer,
  RecallAnswer,
  SurveyAnswers,
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
}: SurveyFormProps) => (
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
    <SurveyActions onPrev={onPrev} onSubmit={onSubmit} />
  </main>
);

export default SurveyForm;
