/**
 * components/VideoPlaceholder.tsx — 광고 영상 플레이스홀더 UI
 * 실제 video 연동 전 그라데이션 배경과 재생 아이콘 표시
 */
const VideoPlaceholder = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(135deg, rgb(26,26,46) 0%, rgb(22,33,62) 40%, rgb(15,52,96) 70%, rgb(83,52,131) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.314)',
      }}
    >
      <div
        style={{
          fontSize: 36,
          marginBottom: 10,
        }}
      >
        ▶
      </div>

      <div
        style={{
          fontSize: 14,
          letterSpacing: '0.1em',
        }}
      >
        광고 영상
      </div>

      <div
        style={{
          fontSize: 11,
          marginTop: 4,
        }}
      >
        VIDEO PLACEHOLDER
      </div>
    </div>
  </div>
);

export default VideoPlaceholder;
