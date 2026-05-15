/**
 * hooks/useGazeSimulation.ts — 시선·EEG 집중도 시뮬레이션 훅
 * 주기적으로 gaze trail·focus 값을 갱신해 오버레이 UI에 전달
 */
import { useEffect, useState } from 'react';
import { GAZE_SIMULATION } from '../constants/simulation';
import { VIEWING } from '../constants/viewing';
import type { GazePoint } from '../types/gaze';
import { appendGazePoint, createNextGazePoint } from '../utils/gaze';
import { randomFocus } from '../utils/focus';

export const useGazeSimulation = () => {
  const [gazeTrail, setGazeTrail] = useState<GazePoint[]>([
    VIEWING.initialGaze,
  ]);
  const [focus, setFocus] = useState(VIEWING.initialFocus);

  useEffect(() => {
    const gazeInterval = setInterval(() => {
      setGazeTrail((prev) => {
        const last = prev[prev.length - 1];
        return appendGazePoint(prev, createNextGazePoint(last));
      });

      setFocus(randomFocus());
    }, GAZE_SIMULATION.intervalMs);

    return () => clearInterval(gazeInterval);
  }, []);

  const currentGaze = gazeTrail[gazeTrail.length - 1];

  return { gazeTrail, focus, currentGaze };
};
