/**
 * components/OpinionQuestion.tsx — Q4 자유 의견 문항.
 */
import { OPINION_MAX_LENGTH, SURVEY_QUESTIONS } from '../constants/questions';
import SurveySection from './SurveySection';

type OpinionQuestionProps = {
  value: string;
  onChange: (value: string) => void;
};

const OpinionQuestion = ({ value, onChange }: OpinionQuestionProps) => (
  <SurveySection
    number={SURVEY_QUESTIONS.opinion.number}
    title={SURVEY_QUESTIONS.opinion.title}
    description={SURVEY_QUESTIONS.opinion.description}
  >
    <div style={{ position: 'relative' }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={OPINION_MAX_LENGTH}
        placeholder="광고에 대한 의견을 자유롭게 작성해주세요."
        style={{
          width: '100%',
          minHeight: 130,
          resize: 'none',
          border: '1.5px solid var(--border)',
          borderRadius: 12,
          padding: 18,
          fontSize: 14,
          lineHeight: 1.6,
          outline: 'none',
          background: 'var(--bg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 14,
          bottom: 10,
          fontSize: 11,
          color: 'var(--text4)',
        }}
      >
        {value.length} / {OPINION_MAX_LENGTH}
      </div>
    </div>
  </SurveySection>
);

export default OpinionQuestion;
