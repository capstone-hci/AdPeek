import { useEffect, useRef, useState, type RefObject } from 'react';

/** 9점 캘리브레이션 그리드 좌표 (%) */
export type CalibrationPoint = { x: number; y: number };

type UseSimulatedPointerGazeOptions = {
  /** 목표 점(%)와의 거리가 이 값(퍼센트pt) 미만이면 응시 중으로 간주 */
  arriveThreshold?: number;
  /** 목표 안에서 이 시간(ms) 유지 시 다음 점으로 진행 */
  dwellMs?: number;
  /** dwell 판정 폴링 간격 (ms) */
  tickMs?: number;
};

const DEFAULT_OPTIONS = {
  arriveThreshold: 6,
  dwellMs: 450,
  tickMs: 50,
} as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * WebGazer 도입 전까지: 캘리브레이션 박스 위 마우스를 시선(%)으로 쓰는 시뮬레이션.
 * 목표 점 근처에 `dwellMs` 머무르면 다음 점으로 진행, 마지막이면 `onComplete`.
 * 실제 시선 연동 시 이 훅 호출부를 실측 훅으로 교체하면 됩니다.
 */
export function useSimulatedPointerGaze(
  areaRef: RefObject<HTMLDivElement | null>,
  points: readonly CalibrationPoint[],
  onComplete: () => void,
  options?: UseSimulatedPointerGazeOptions
) {
  const arriveThreshold =
    options?.arriveThreshold ?? DEFAULT_OPTIONS.arriveThreshold;
  const dwellMs = options?.dwellMs ?? DEFAULT_OPTIONS.dwellMs;
  const tickMs = options?.tickMs ?? DEFAULT_OPTIONS.tickMs;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [gaze, setGaze] = useState({ x: 50, y: 50 });

  const lastGazeRef = useRef({ x: 50, y: 50 });
  const currentIndexRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const dwellStartRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const gx = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
      const gy = clamp(((e.clientY - rect.top) / rect.height) * 100, 0, 100);
      lastGazeRef.current = { x: gx, y: gy };
      setGaze({ x: gx, y: gy });
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [areaRef]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (finishedRef.current) return;

      const idx = currentIndexRef.current;
      const cp = points[idx];
      if (!cp) return;

      const { x: gx, y: gy } = lastGazeRef.current;
      const dist = Math.hypot(gx - cp.x, gy - cp.y);

      if (dist >= arriveThreshold) {
        dwellStartRef.current = null;
        return;
      }

      const now = performance.now();
      if (dwellStartRef.current === null) {
        dwellStartRef.current = now;
        return;
      }

      if (now - dwellStartRef.current < dwellMs) return;

      dwellStartRef.current = null;

      if (idx >= points.length - 1) {
        finishedRef.current = true;
        onCompleteRef.current();
        return;
      }

      const next = idx + 1;
      currentIndexRef.current = next;
      setCurrentIndex(next);
    }, tickMs);

    return () => window.clearInterval(id);
  }, [arriveThreshold, dwellMs, points, tickMs]);

  return { gaze, currentIndex };
}
