/**
 * components/EmotionQuestion.tsx — Q3 감정 반응 문항.
 */
import { EMOTION_OPTIONS, SURVEY_QUESTIONS } from '../constants/questions';
import type { EmotionAnswer } from '../types/survey';
import OptionButton from './OptionButton';
import SurveySection from './SurveySection';

type EmotionQuestionProps = {
  value: EmotionAnswer | null;
  onChange: (value: EmotionAnswer) => void;
};

const EmotionQuestion = ({ value, onChange }: EmotionQuestionProps) => (
  <SurveySection
    number={SURVEY_QUESTIONS.emotion.number}
    title={SURVEY_QUESTIONS.emotion.title}
  >
    <div style={{ display: 'flex', gap: 12 }}>
      {EMOTION_OPTIONS.map((option) => (
        <OptionButton
          key={option.value}
          selected={value === option.value}
          label={option.label}
          description={option.description}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  </SurveySection>
);

export default EmotionQuestion;
