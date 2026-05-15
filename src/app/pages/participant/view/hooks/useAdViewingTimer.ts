/**
 * hooks/useAdViewingTimer.ts — 광고 재생 타이머 훅
 * 1초마다 currentTime 증가, 진행률·남은 시간 계산, 종료 시 onComplete 호출
 */
import { useEffect, useMemo, useState } from 'react';
import { TIMER_INTERVAL_MS } from '../constants/simulation';
import { VIEWING } from '../constants/viewing';
import { getProgressPercent, getRemainSeconds } from '../utils/progress';

export const useAdViewingTimer = (onComplete: () => void) => {
  const [currentTime, setCurrentTime] = useState(VIEWING.initialTimeSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= VIEWING.totalDurationSeconds) {
          return VIEWING.totalDurationSeconds;
        }

        return prev + 1;
      });
    }, TIMER_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentTime < VIEWING.totalDurationSeconds) {
      return;
    }

    onComplete();
  }, [currentTime, onComplete]);

  const progress = useMemo(
    () => getProgressPercent(currentTime, VIEWING.totalDurationSeconds),
    [currentTime]
  );

  const remain = getRemainSeconds(currentTime, VIEWING.totalDurationSeconds);

  return {
    currentTime,
    totalDuration: VIEWING.totalDurationSeconds,
    progress,
    remain,
  };
};
