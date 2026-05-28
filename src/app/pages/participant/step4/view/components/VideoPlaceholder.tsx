/**
 * components/VideoPlaceholder.tsx — 광고 영상 플레이어
 * 자동재생·음소거로 시작, onTimeUpdate로 재생 시간 전달, 종료 시 onEnded 호출
 */
import advertiseVideo from '@shared/assets/advertise-video.mp4';
import type { RefObject } from 'react';

type VideoPlaceholderProps = {
  videoRef: RefObject<HTMLVideoElement>;
  onEnded: () => void;
};

const VideoPlaceholder = ({ videoRef, onEnded }: VideoPlaceholderProps) => (
  <video
    ref={videoRef}
    src={advertiseVideo}
    autoPlay
    muted
    playsInline
    onEnded={onEnded}
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
);

export default VideoPlaceholder;
