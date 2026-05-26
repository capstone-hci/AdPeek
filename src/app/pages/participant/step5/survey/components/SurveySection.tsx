/**
 * components/SurveySection.tsx — 설문 문항 섹션 래퍼.
 */
import type { ReactNode } from 'react';

type SurveySectionProps = {
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
};

const SurveySection = ({
  number,
  title,
  description,
  children,
}: SurveySectionProps) => (
  <section
    style={{
      paddingBottom: 24,
      marginBottom: 24,
      borderBottom: '1px solid var(--border2)',
    }}
  >
    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>
      {number}
    </div>
    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{title}</h3>
    {description && (
      <p
        style={{
          color: 'var(--text3)',
          fontSize: 12,
          marginBottom: 12,
        }}
      >
        {description}
      </p>
    )}
    {children}
  </section>
);

export default SurveySection;
