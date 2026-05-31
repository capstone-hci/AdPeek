/**
 * constants/viewing.ts — 광고 시청(step5) 페이지의 초기·메타 데이터
 *
 * API 연동 전 UI/시뮬레이션용 더미입니다.
 * 연동 후에는 광고 메타(ready의 `DUMMY_AD` 등)와 시청 세션 API 응답으로 대체합니다.
 *
 * @see useAdViewingTimer — 재생 시간·진행률·완료 처리
 */
export const VIEWING = {
  /** 광고 전체 길이(초). 타이머 종료·진행률·남은 시간 계산에 사용 */
  totalDurationSeconds: 30,

  /**
   * 페이지 진입 시 재생 위치(초).
   * 데모용으로 7초부터 시작(이미 시청 중인 것처럼 보이게 함).
   * 실제 연동 시에는 0 또는 서버의 `currentPosition` 등을 사용
   */
  initialTimeSeconds: 7,

  /**
   * 시선 좌표(%) 초기값. 영상 영역 기준 x/y (0~100).
   * `GazeOverlay`의 현재 시선·궤적 trail 시작점
   */
  initialGaze: { x: 64.9, y: 66.3 },
};
