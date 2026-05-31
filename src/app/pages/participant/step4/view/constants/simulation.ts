/**
 * constants/simulation.ts — 광고 시청 화면의 더미 데이터 갱신 규칙.
 *
 * `viewing.ts`가 "이번 시청의 초기값·길이"라면,
 * 이 파일은 시선·타이머를 **얼마나 자주, 어떤 범위로 움직일지** 정합니다.
 *
 * @see useAdViewingTimer — `TIMER_INTERVAL_MS`
 * @see utils/gaze
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
