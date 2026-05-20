export interface WebGazerInitOptions {
  onGaze?: GazeListener;
  showVideo?: boolean;
  showPredictionPoints?: boolean;
  saveDataAcrossSessions?: boolean;
  applyKalmanFilter?: boolean;
}

// WASM은 한 번만 초기화 가능. begin()은 페이지 생애 동안 단 1회만 호출.
// pause()/resume()은 내부 비디오 엘리먼트를 null 처리하는 버그가 있어 사용 금지.
let _webgazerStarted = false;

export function initWebGazer(options: WebGazerInitOptions = {}): void {
  const {
    onGaze,
    showVideo = false,
    showPredictionPoints = false,
    saveDataAcrossSessions = false,
    applyKalmanFilter = false,
  } = options;

  // SPA 라우팅에서 상대 경로가 현재 URL 기준으로 해석되는 문제 방지
  window.webgazer.params.faceMeshSolutionPath = '/mediapipe/face_mesh';

  window.webgazer
    .setRegression('ridge')
    .setTracker('TFFacemesh')
    .showVideoPreview(showVideo)
    .showPredictionPoints(showPredictionPoints)
    .saveDataAcrossSessions(saveDataAcrossSessions)
    .applyKalmanFilter(applyKalmanFilter);

  if (onGaze) {
    window.webgazer.setGazeListener(onGaze);
  }
}

export async function beginWebGazer(): Promise<void> {
  // 이미 시작된 경우: begin() 재호출 시 WASM 크래시, resume() 시 null 에러
  // → 아무것도 하지 않음. initWebGazer()에서 리스너가 이미 교체됨.
  if (_webgazerStarted) return;
  _webgazerStarted = true;
  await window.webgazer.begin();
}

export function destroyWebGazer(): void {
  if (!_webgazerStarted) return;
  if (!window.webgazer) return;
  try {
    // pause()/end() 모두 사용 금지:
    //   end() → WASM 완전 종료, 재시작 불가
    //   pause() → 내부 비디오 엘리먼트 null화 → resume() 크래시
    // clearGazeListener()만 호출해 React 상태 업데이트를 차단.
    // WebGazer는 계속 실행되지만 콜백이 없으므로 UI에 영향 없음.
    window.webgazer.clearGazeListener();
  } catch (e) {
    console.warn('webgazer 종료 중 오류:', e);
  }
}
