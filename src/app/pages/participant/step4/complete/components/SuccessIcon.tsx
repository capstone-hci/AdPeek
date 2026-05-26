/**
 * components/SuccessIcon.tsx — 완료 체크 아이콘(원형 배경 + SVG).
 */
const SuccessIcon = () => (
  <div
    style={{
      width: 70,
      height: 70,
      background: 'rgb(26, 46, 26)',
      borderRadius: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
    }}
  >
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path
        d="M6 15L12 21L24 9"
        stroke="var(--success)"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default SuccessIcon;
