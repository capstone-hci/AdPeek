export interface WebGazerInitOptions {
  onGaze?: GazeListener;
  showVideo?: boolean;
  showPredictionPoints?: boolean;
  saveDataAcrossSessions?: boolean;
  applyKalmanFilter?: boolean;
}

// 모듈 레벨 — StrictMode 재마운트 시에도 값 유지됨
let _webgazerActive = false;

export function initWebGazer(options: WebGazerInitOptions = {}): void {
  const {
    onGaze,
    showVideo = false,
    showPredictionPoints = false,
    saveDataAcrossSessions = false,
    applyKalmanFilter = false,
  } = options;

  // 추가: SPA 라우팅에서 상대 경로가 현재 URL 기준으로 해석되는 문제 방지
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

// begin()을 직접 호출하는 대신 이 함수 사용
export async function beginWebGazer(): Promise<void> {
  if (_webgazerActive) return; // 이미 실행 중이면 무시
  _webgazerActive = true;
  await window.webgazer.begin();
}

export function destroyWebGazer(): void {
  if (!_webgazerActive) return; // 실행 중이 아니면 무시
  _webgazerActive = false;
  if (!window.webgazer) return;
  try {
    window.webgazer.clearGazeListener();
    window.webgazer.end();
  } catch (e) {
    console.warn('webgazer 종료 중 오류:', e);
    alert('webgazer 종료 중 오류:');
  }
}
