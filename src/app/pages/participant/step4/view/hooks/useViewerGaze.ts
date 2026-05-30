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
import { postSessionStart, postSessionStop } from '@app/shared/apis/session';
import { endWebGazer } from '@shared/utils/webgazerInit';

const AD_ID = 'ad_001';

type UseViewerGazeOptions = {
  videoRef: RefObject<HTMLVideoElement | null>;
  onComplete: () => void;
};

export const useViewerGaze = ({
  videoRef,
  onComplete,
}: UseViewerGazeOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { gazeData, begin } = useGazer({ showVideo: false });

  // 화면 표시용 trail (기존 유지)
  const [gazeTrail, setGazeTrail] = useState<GazePoint[]>([
    VIEWING.initialGaze,
  ]);
  const [focus, setFocus] = useState(VIEWING.initialFocus);

  // 전송용 버퍼 — 렌더 불필요하므로 ref
  const gazeBufferRef = useRef<RawGazePoint[]>([]);
  const sessionStartRef = useRef<number>(0);
  const sessionStartedRef = useRef(false); // 중복 호출 방지

  useEffect(() => {
    if (sessionStartedRef.current) return;
    sessionStartedRef.current = true;

    sessionStartRef.current = Date.now();
    gazeBufferRef.current = [];

    postSessionStart({ ad_id: AD_ID }).catch((e) =>
      console.error('[session] start 실패:', e)
    );

    begin().then(() => {
      window.webgazer?.removeMouseEventListeners();
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
    } catch (error) {
      console.error('[gaze] 전송 실패:', error);
    }

    try {
      await postSessionStop({ ad_id: AD_ID });
    } catch (error) {
      console.error('[session] stop 실패:', error);
    } finally {
      endWebGazer();
      onComplete();
    }
  }, [onComplete]);

  const currentGaze = gazeTrail[gazeTrail.length - 1];

  return { gazeTrail, focus, currentGaze, containerRef, handleComplete };
};
