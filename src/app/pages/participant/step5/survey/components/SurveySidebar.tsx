/**
 * components/SurveySidebar.tsx — 설문 페이지 좌측 안내 사이드바.
 */
import { SURVEY_COPY } from '../constants/copy';

const SurveySidebar = () => (
  <aside style={{ position: 'sticky', top: 40 }}>
    <div
      style={{
        fontSize: 11,
        color: 'var(--text3)',
        fontWeight: 600,
        letterSpacing: '0.12em',
        marginBottom: 12,
      }}
    >
      {SURVEY_COPY.stepLabel}
    </div>

    <h2
      style={{
        fontSize: 36,
        fontWeight: 800,
        letterSpacing: '-0.04em',
        lineHeight: 1.2,
        marginBottom: 24,
      }}
    >
      {SURVEY_COPY.title[0]}
      <br />
      {SURVEY_COPY.title[1]}
    </h2>

    <p
      style={{
        color: 'var(--text2)',
        fontSize: 14,
        lineHeight: 1.7,
        marginBottom: 36,
      }}
    >
      {SURVEY_COPY.description[0]}
      <br />
      {SURVEY_COPY.description[1]}
    </p>

    {SURVEY_COPY.highlights.map((text) => (
      <div
        key={text}
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          color: 'var(--text2)',
          fontSize: 13,
          marginBottom: 18,
        }}
      >
        <span style={{ color: 'var(--accent)' }}>✓</span>
        {text}
      </div>
    ))}
  </aside>
);

export default SurveySidebar;
