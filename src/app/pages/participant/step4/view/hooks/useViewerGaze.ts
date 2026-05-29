import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type RefObject,
} from 'react';
import { useGazer } from '@shared/hooks/useGazer';
import { randomFocus } from '../utils/focus';
import { appendGazePoint } from '../utils/gaze';
import type { GazePoint, RawGazePoint } from '../types/gaze';
import { VIEWING } from '../constants/viewing';
import { postGazeData } from '@app/shared/apis/gaze';
import { endWebGazer } from '@shared/utils/webgazerInit';

const AD_ID = 'dummy-ad-001';

type UseViewerGazeOptions = {
  videoRef: RefObject<HTMLVideoElement | null>;
  onComplete: () => void;
};

export const useViewerGaze = ({
  videoRef,
  onComplete,
}: UseViewerGazeOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { gazeData, begin } = useGazer({ showVideo: true });

  // 화면 표시용 trail (기존 유지)
  const [gazeTrail, setGazeTrail] = useState<GazePoint[]>([
    VIEWING.initialGaze,
  ]);
  const [focus, setFocus] = useState(VIEWING.initialFocus);

  // 전송용 버퍼 — 렌더 불필요하므로 ref
  const gazeBufferRef = useRef<RawGazePoint[]>([]);
  const sessionStartRef = useRef<number>(0);

  useEffect(() => {
    sessionStartRef.current = Date.now();
    gazeBufferRef.current = [];

    begin().then(() => {
      window.webgazer.removeMouseEventListeners();
    });
  }, [begin]);

  useEffect(() => {
    if (!gazeData || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // 표시용: % (0~100)
    const xPct = Math.min(
      100,
      Math.max(0, ((gazeData.x - rect.left) / rect.width) * 100)
    );
    const yPct = Math.min(
      100,
      Math.max(0, ((gazeData.y - rect.top) / rect.height) * 100)
    );

    setGazeTrail((prev) => appendGazePoint(prev, { x: xPct, y: yPct }));
    setFocus(randomFocus());

    // 전송용: 0~1 정규화
    const x_norm = Math.min(
      1,
      Math.max(0, (gazeData.x - rect.left) / rect.width)
    );
    const y_norm = Math.min(
      1,
      Math.max(0, (gazeData.y - rect.top) / rect.height)
    );

    const elapsed_ms = videoRef.current
      ? Math.round(videoRef.current.currentTime * 1000)
      : Date.now() - sessionStartRef.current;

    gazeBufferRef.current.push({
      x_norm,
      y_norm,
      timestamp: Date.now(),
      elapsed_ms,
    });
  }, [gazeData, videoRef]);

  const handleComplete = useCallback(async () => {
    try {
      await postGazeData({
        ad_id: AD_ID,
        start_time: sessionStartRef.current,
        data: gazeBufferRef.current,
      });
      console.log('[gaze] 전송 완료, 포인트 수:', gazeBufferRef.current.length);
    } catch (error) {
      console.error('[gaze] 전송 실패:', error);
    } finally {
      endWebGazer();
      onComplete();
    }
  }, [onComplete]);

  const currentGaze = gazeTrail[gazeTrail.length - 1];

  return { gazeTrail, focus, currentGaze, containerRef, handleComplete };
};
