import { useState, useEffect, useRef } from 'react';
import { useGazer } from '@shared/hooks/useGazer';
import { randomFocus } from '../utils/focus';
import { appendGazePoint } from '../utils/gaze';
import type { GazePoint } from '../types/gaze';
import { VIEWING } from '../constants/viewing';

export const useViewerGaze = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { gazeData, begin } = useGazer({ showVideo: true });

  const [gazeTrail, setGazeTrail] = useState<GazePoint[]>([
    VIEWING.initialGaze,
  ]);
  const [focus, setFocus] = useState(VIEWING.initialFocus);

  useEffect(() => {
    begin();
  }, [begin]);

  useEffect(() => {
    if (!gazeData || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(
      100,
      Math.max(0, ((gazeData.x - rect.left) / rect.width) * 100)
    );
    const y = Math.min(
      100,
      Math.max(0, ((gazeData.y - rect.top) / rect.height) * 100)
    );

    setGazeTrail((prev) => appendGazePoint(prev, { x, y }));
    setFocus(randomFocus());
  }, [gazeData]);

  const currentGaze = gazeTrail[gazeTrail.length - 1];

  return { gazeTrail, focus, currentGaze, containerRef };
};
