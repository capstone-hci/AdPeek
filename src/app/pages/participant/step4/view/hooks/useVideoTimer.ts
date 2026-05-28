/**
 * hooks/useVideoTimer.ts — 영상 currentTime 기반 타이머 훅
 * video 엘리먼트의 timeupdate 이벤트로 재생 시간·진행률·남은 시간을 계산한다.
 * useAdViewingTimer(자체 카운트다운)를 대체한다.
 */
import { useState, useEffect, useMemo, type RefObject } from 'react';
import { getProgressPercent, getRemainSeconds } from '../utils/progress';

export const useVideoTimer = (
  videoRef: RefObject<HTMLVideoElement>,
  onComplete: () => void
) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && totalDuration === 0) {
        setTotalDuration(video.duration);
      }
    };

    const handleLoadedMetadata = () => {
      setTotalDuration(video.duration);
    };

    const handleEnded = () => {
      onComplete();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoRef, onComplete, totalDuration]);

  const progress = useMemo(
    () => getProgressPercent(currentTime, totalDuration),
    [currentTime, totalDuration]
  );

  const remain = getRemainSeconds(currentTime, totalDuration);

  return { currentTime, totalDuration, progress, remain };
};
