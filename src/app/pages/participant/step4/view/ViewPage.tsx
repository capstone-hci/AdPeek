import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';
import AdVideoPlayer from './components/AdVideoPlayer';
import ViewProgress from './components/ViewProgress';
import { useVideoTimer } from './hooks/useVideoTimer';
import { useViewerGaze } from './hooks/useViewerGaze';

const ViewPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const { handleComplete, focus, containerRef } = useViewerGaze({
    videoRef,
    onComplete: () => navigate(paths.step4.complete),
  });

  const { currentTime, totalDuration, progress, remain } = useVideoTimer(
    videoRef,
    handleComplete
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'rgb(10, 10, 15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        animation: 'fadeIn 0.4s ease',
      }}
    >
      <div style={{ width: '100%', maxWidth: 860 }}>
        <AdVideoPlayer
          containerRef={containerRef}
          videoRef={videoRef}
          currentTime={currentTime}
          totalDuration={totalDuration}
          focus={focus}
          onEnded={handleComplete}
        />
        <ViewProgress progress={progress} remain={remain} />
      </div>
    </div>
  );
};

export default ViewPage;
