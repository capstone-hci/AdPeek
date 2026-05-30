/**
 * types/gaze.ts — 시선 좌표 타입
 * GazePoint: 영상 영역 기준 백분율(%) x, y. GazeOverlay·시선 시뮬레이션에서 사용
 * RawGazePoint: /api/gaze 전송용 정규화 좌표 (0~1) + 타임스탬프
 */
export type GazePoint = {
  x: number;
  y: number;
};

export type RawGazePoint = {
  x_norm: number; // 컨테이너 기준 0~1
  y_norm: number; // 컨테이너 기준 0~1
  timestamp: number; // Unix ms (Date.now())
  elapsed_ms: number; // 영상 currentTime 기준 경과 ms
};
