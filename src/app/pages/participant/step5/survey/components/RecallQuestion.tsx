/**
 * components/RecallQuestion.tsx — Q1 기억 여부 문항.
 */
import { RECALL_OPTIONS, SURVEY_QUESTIONS } from '../constants/questions';
import type { RecallAnswer } from '../types/survey';
import OptionButton from './OptionButton';
import SurveySection from './SurveySection';

type RecallQuestionProps = {
  value: RecallAnswer | null;
  onChange: (value: RecallAnswer) => void;
};

const RecallQuestion = ({ value, onChange }: RecallQuestionProps) => (
  <SurveySection
    number={SURVEY_QUESTIONS.recall.number}
    title={SURVEY_QUESTIONS.recall.title}
  >
    <div style={{ display: 'flex', gap: 12 }}>
      {RECALL_OPTIONS.map((option) => (
        <OptionButton
          key={option.value}
          selected={value === option.value}
          label={option.label}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  </SurveySection>
);

export default RecallQuestion;
