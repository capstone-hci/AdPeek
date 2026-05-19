import { useState, useEffect, useRef, useCallback } from 'react';
import {
  beginWebGazer,
  initWebGazer,
  destroyWebGazer,
} from '@shared/utils/webgazerInit';

interface GazePoint {
  x: number;
  y: number;
  timestamp: number;
}

const TARGET_HZ = 30;
const SAMPLE_INTERVAL_MS = 1000 / TARGET_HZ;

export function useGazer() {
  const [gazeData, setGazeData] = useState<GazePoint | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  // 중복 호출 방지
  const isInitialized = useRef(false);
  // 마지막으로 처리한 시각
  const lastSampleTime = useRef(0);

  const begin = useCallback(async () => {
    // 이미 시작된 상태면 아무것도 하지 않는다
    if (isInitialized.current) return;

    initWebGazer({
      onGaze: (data) => {
        // 얼굴이 감지되지 않을 때 무시
        if (!data) return;

        const now = Date.now();

        // 마지막 처리 후 SAMPLE_INTERVAL_MS 안 지났으면 무시 → 30Hz 고정
        if (now - lastSampleTime.current < SAMPLE_INTERVAL_MS) return;
        lastSampleTime.current = now;

        // x, y에 현재 시간을 붙여서 상태 업데이트
        console.log('gaze:', data.x, data.y);
        setGazeData({ x: data.x, y: data.y, timestamp: Date.now() });
      },
    });

    await beginWebGazer();

    // 초기화
    isInitialized.current = true;
    setIsRunning(true);
  }, []);

  const end = useCallback(() => {
    // 초기화되지 않은 상태면 무시 (StrictMode 이중 cleanup 방지)
    if (!isInitialized.current) return;
    destroyWebGazer();

    // 초기화 플래그 리셋
    isInitialized.current = false;
    lastSampleTime.current = 0;
    setIsRunning(false);
    setGazeData(null);
  }, []);

  // 일시 중지 - 카메라는 유지, 콜백 호출만 멈춤
  const pause = useCallback(() => {
    window.webgazer.pause();
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    window.webgazer.resume();
    setIsRunning(true);
  }, []);

  useEffect(() => {
    return () => {
      end();
    };
  }, [end]);

  return { gazeData, isRunning, begin, end, pause, resume };
}
