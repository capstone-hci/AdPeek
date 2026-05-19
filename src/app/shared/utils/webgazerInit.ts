export interface WebGazerInitOptions {
  onGaze?: GazeListener;
  showVideo?: boolean;
  showPredictionPoints?: boolean;
  saveDataAcrossSessions?: boolean;
  applyKalmanFilter?: boolean;
}

// WASM은 한 번 종료되면 재초기화 불가
// → begin()은 최초 1회만 호출, 이후엔 resume()으로 재개
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
  if (_webgazerStarted) {
    // 이미 시작된 상태 (StrictMode 재마운트 or 페이지 재진입)
    // begin() 재호출 시 WASM 크래시 → resume()으로 재개
    window.webgazer.resume();
    return;
  }
  _webgazerStarted = true;
  await window.webgazer.begin();
}

export function destroyWebGazer(): void {
  if (!_webgazerStarted) return;
  if (!window.webgazer) return;
  try {
    window.webgazer.clearGazeListener();
    // end() 대신 pause() 사용:
    // end()는 WASM을 완전히 종료해 재시작 불가능하게 만듦
    // pause()는 예측만 멈추고 WASM은 유지 → resume()으로 재개 가능
    window.webgazer.pause();
  } catch (e) {
    console.warn('webgazer 종료 중 오류:', e);
  }
  // _webgazerStarted는 리셋하지 않음
  // → 다음 beginWebGazer() 호출 시 resume()으로 처리
}
