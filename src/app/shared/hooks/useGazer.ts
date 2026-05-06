import { useState, useEffect, useRef, useCallback } from 'react';
import { initWebGazer, destroyWebGazer } from '@shared/utils/webgazerInit';

interface GazePoint {
  x: number;
  y: number;
  timestamp: number;
}

export function useGazer() {
  const [gazeData, setGazeData] = useState<GazePoint | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  // 중복 호출 방지
  const isInitialized = useRef(false);

  const begin = useCallback(async () => {
    // 이미 시작된 상태면 아무것도 하지 않는다
    if (isInitialized.current) return;

    initWebGazer({
      onGaze: (data) => {
        // 얼굴이 감지되지 않을 때 무시
        if (!data) return;

        // x, y에 현재 시간을 붙여서 상태 업데이트
        setGazeData({ x: data.x, y: data.y, timestamp: Date.now() });
      },
    });

    await window.webgazer.begin();

    // 초기화
    isInitialized.current = true;
    setIsRunning(true);
  }, []);

  const end = useCallback(() => {
    destroyWebGazer();

    // 초기화 플래그 리셋
    isInitialized.current = false;
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
