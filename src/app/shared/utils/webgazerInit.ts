export interface WebGazerInitOptions {
  onGaze?: GazeListener;
  showVideo?: boolean;
  showPredictionPoints?: boolean;
  saveDataAcrossSessions?: boolean;
  applyKalmanFilter?: boolean;
}

let _webgazerStarted = false;

export function initWebGazer(options: WebGazerInitOptions = {}): void {
  const {
    onGaze,
    showVideo = false,
    showPredictionPoints = false,
    saveDataAcrossSessions = false,
    applyKalmanFilter = false,
  } = options;

  window.webgazer.params.faceMeshSolutionPath = '/mediapipe/face_mesh';

  window.webgazer
    .setRegression('weightedRidge') // 최근 샘플에 더 높은 가중치 → 빠른 수렴
    .setTracker('TFFacemesh')
    .showVideoPreview(showVideo)
    .showPredictionPoints(showPredictionPoints)
    .saveDataAcrossSessions(saveDataAcrossSessions)
    .applyKalmanFilter(applyKalmanFilter);

  if (onGaze) {
    window.webgazer.setGazeListener(onGaze);
  }

  const style = document.createElement('style');
  style.textContent = `
  #webgazerVideoFeed,
  #webgazerVideoContainer,
  #webgazerFaceOverlay,
  #webgazerFaceFeedbackBox {
    left: auto !important;
    right: 0 !important;
    top: 0 !important;
    width: 300px !important;
    height: 200px !important;
  }
`;
  document.head.appendChild(style);
}

export async function beginWebGazer(): Promise<void> {
  if (_webgazerStarted) return;
  _webgazerStarted = true;
  await window.webgazer.begin();
}

export function destroyWebGazer(): void {
  if (!_webgazerStarted) return;
  if (!window.webgazer) return;
  try {
    window.webgazer.clearGazeListener();
  } catch (e) {
    console.warn('webgazer 종료 중 오류:', e);
  }
}

export function endWebGazer(): void {
  if (!window.webgazer) return;
  try {
    window.webgazer.clearGazeListener();
    window.webgazer.end();
    _webgazerStarted = false;
  } catch (e) {
    console.warn('webgazer end 중 오류:', e);
  }
}
