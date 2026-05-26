/**
 * components/SurveyActions.tsx — 이전·제출 버튼.
 */
import { SURVEY_COPY } from '../constants/copy';

type SurveyActionsProps = {
  canSubmit: boolean;
  onPrev: () => void;
  onSubmit: () => void;
};

const SurveyActions = ({ canSubmit, onPrev, onSubmit }: SurveyActionsProps) => (
  <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
    <button
      type="button"
      onClick={onPrev}
      style={{
        border: 'none',
        color: 'var(--text2)',
        padding: '15px 28px',
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 600,
        background: 'var(--surface)',
        boxShadow: 'inset 0 0 0 1px var(--border)',
        cursor: 'pointer',
      }}
    >
      {SURVEY_COPY.prevButton}
    </button>

    <button
      type="button"
      disabled={!canSubmit}
      onClick={onSubmit}
      style={{
        border: 'none',
        flex: 1,
        background: canSubmit ? 'var(--accent)' : 'var(--bg2)',
        color: canSubmit ? '#fff' : 'var(--text4)',
        padding: '15px 28px',
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 600,
        cursor: canSubmit ? 'pointer' : 'not-allowed',
      }}
    >
      {SURVEY_COPY.submitButton}
    </button>
  </div>
);

export default SurveyActions;
