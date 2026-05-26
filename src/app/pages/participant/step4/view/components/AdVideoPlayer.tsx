/**
 * components/AdVideoPlayer.tsx — 16:9 광고 영상 플레이어 컨테이너
 * 플레이스홀더·시선 오버레이·측정 배지·타이머·EEG 패널을 한 영역에 배치
 */
import type { RefObject } from 'react';
import EegFocusPanel from './EegFocusPanel';
import RecordingBadge from './RecordingBadge';
import VideoPlaceholder from './VideoPlaceholder';
import ViewTimer from './ViewTimer';

type AdVideoPlayerProps = {
  containerRef: RefObject<HTMLDivElement>;
  currentTime: number;
  totalDuration: number;
  focus: number;
};

const AdVideoPlayer = ({
  containerRef,
  currentTime,
  totalDuration,
  focus,
}: AdVideoPlayerProps) => (
  <div
    ref={containerRef}
    style={{
      position: 'relative',
      aspectRatio: '16 / 9',
      background: 'rgb(17,17,17)',
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 16,
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    }}
  >
    <VideoPlaceholder />
    <RecordingBadge />
    <ViewTimer currentTime={currentTime} totalDuration={totalDuration} />
    <EegFocusPanel focus={focus} />
  </div>
);

export default AdVideoPlayer;
