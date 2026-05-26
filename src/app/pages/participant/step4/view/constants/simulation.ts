/**
 * constants/simulation.ts — 광고 시청 화면의 더미 데이터 갱신 규칙.
 *
 * `viewing.ts`가 "이번 시청의 초기값·길이"라면,
 * 이 파일은 시선·집중도·타이머를 **얼마나 자주, 어떤 범위로 움직일지** 정합니다.
 *
 * 실제 WebGazer·EEG 연동 시에는 대부분 제거되거나,
 * 디바이스/서버 폴링 주기에 맞게 대체됩니다.
 *
 * @see useAdViewingTimer — `TIMER_INTERVAL_MS`
 * @see useGazeSimulation — `GAZE_SIMULATION`, `FOCUS_SIMULATION`
 * @see utils/gaze, utils/focus
 */

/** 재생 시간 1초 증가 주기. `useAdViewingTimer`의 setInterval 간격 */
export const TIMER_INTERVAL_MS = 1000;

/**
 * 시선 궤적(gaze trail) 시뮬레이션 설정.
 * `GazeOverlay`에 그려지는 점·trail 이동에 사용
 */
export const GAZE_SIMULATION = {
  /** 시선 좌표 갱신 주기(ms) */
  intervalMs: 120,

  /** 화면에 남길 trail 점 개수 상한 */
  trailMaxLength: 30,

  /** 시선이 움직일 수 있는 영역(%, 영상 기준). 화면 밖으로 나가지 않게 clamp */
  bounds: {
    xMin: 15,
    xMax: 85,
    yMin: 20,
    yMax: 80,
  },

  /** 한 tick마다 x/y가 랜덤으로 변하는 최대 폭(±delta) */
  delta: {
    x: 4,
    y: 3,
  },
};

/**
 * EEG 집중도(%) 시뮬레이션 설정.
 * `randomFocus()`로 120ms마다 72~99% 사이 값 생성
 */
export const FOCUS_SIMULATION = {
  min: 72,
  max: 99,
  /** 랜덤 변동의 기준값 (base ± range/2 수준) */
  base: 88,
  range: 10,
};
