/**
 * components/RecordingBadge.tsx — 좌상단 「측정 중」 녹화 표시 배지
 */
const RecordingBadge = () => (
  <div
    style={{
      position: 'absolute',
      top: 14,
      left: 14,
      background: 'rgba(0,0,0,0.7)',
      borderRadius: 8,
      padding: '6px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      backdropFilter: 'blur(4px)',
    }}
  >
    <div
      style={{
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'rgb(231,80,100)',
        animation: 'pulse 1s ease infinite',
      }}
    />

    <span
      style={{
        color: '#fff',
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      측정 중
    </span>
  </div>
);

export default RecordingBadge;
