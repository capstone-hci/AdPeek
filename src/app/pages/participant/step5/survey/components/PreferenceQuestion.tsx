/**
 * components/PreferenceQuestion.tsx — Q2 호감도(1~5점) 문항.
 */
import { PREFERENCE_SCORES, SURVEY_QUESTIONS } from '../constants/questions';
import SurveySection from './SurveySection';

type PreferenceQuestionProps = {
  value: number;
  onChange: (value: number) => void;
};

const SCORE_LABELS: Record<number, string> = {
  1: '매우 낮음',
  5: '매우 높음',
};

const PreferenceQuestion = ({ value, onChange }: PreferenceQuestionProps) => (
  <SurveySection
    number={SURVEY_QUESTIONS.preference.number}
    title={SURVEY_QUESTIONS.preference.title}
    description={SURVEY_QUESTIONS.preference.description}
  >
    <div style={{ display: 'flex', gap: 10 }}>
      {PREFERENCE_SCORES.map((score) => {
        const selected = value === score;
        const label = SCORE_LABELS[score];

        return (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            style={{
              width: 78,
              height: 78,
              borderRadius: 10,
              border: selected
                ? '1.5px solid var(--accent)'
                : '1.5px solid var(--border)',
              background: selected ? 'var(--accent-soft)' : '#fff',
              color: selected ? 'var(--accent)' : 'var(--text4)',
              fontSize: 26,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            {score}
            {label && (
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  marginTop: 6,
                  color: 'var(--text4)',
                }}
              >
                {label}
              </div>
            )}
          </button>
        );
      })}
    </div>
  </SurveySection>
);

export default PreferenceQuestion;
