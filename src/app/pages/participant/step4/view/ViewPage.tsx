import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';
import AdVideoPlayer from './components/AdVideoPlayer';
import ViewProgress from './components/ViewProgress';
import { useAdViewingTimer } from './hooks/useAdViewingTimer';
import { useViewerGaze } from './hooks/useViewerGaze';

const ViewPage = () => {
  const navigate = useNavigate();

  const handleComplete = useCallback(() => {
    navigate(paths.step4.complete);
  }, [navigate]);

  const { currentTime, totalDuration, progress, remain } =
    useAdViewingTimer(handleComplete);
  const { focus, containerRef } = useViewerGaze();

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
      <div
        style={{
          width: '100%',
          maxWidth: 860,
        }}
      >
        <AdVideoPlayer
          containerRef={containerRef}
          currentTime={currentTime}
          totalDuration={totalDuration}
          focus={focus}
        />

        <ViewProgress progress={progress} remain={remain} />
      </div>
    </div>
  );
};

export default ViewPage;
