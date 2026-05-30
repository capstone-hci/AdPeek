import { ensureWebGazer } from './webgazerLoader';

export interface WebGazerInitOptions {
  onGaze?: GazeListener;
  showVideo?: boolean;
  showPredictionPoints?: boolean;
  saveDataAcrossSessions?: boolean;
  applyKalmanFilter?: boolean;
}

let _webgazerStarted = false;

export async function initWebGazer(
  options: WebGazerInitOptions = {}
): Promise<void> {
  const {
    onGaze,
    showVideo = false,
    showPredictionPoints = false,
    saveDataAcrossSessions = false,
    applyKalmanFilter = false,
  } = options;

  const webgazer = await ensureWebGazer();

  webgazer.params.faceMeshSolutionPath = '/mediapipe/face_mesh';

  webgazer
    .setRegression('weightedRidge')
    .setTracker('TFFacemesh')
    .showVideoPreview(showVideo)
    .showPredictionPoints(showPredictionPoints)
    .saveDataAcrossSessions(saveDataAcrossSessions)
    .applyKalmanFilter(applyKalmanFilter);

  if (onGaze) {
    webgazer.setGazeListener(onGaze);
  }

  if (!document.querySelector('style[data-webgazer-layout="true"]')) {
    const style = document.createElement('style');
    style.dataset.webgazerLayout = 'true';
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
}

export async function beginWebGazer(): Promise<void> {
  if (_webgazerStarted) return;

  const webgazer = await ensureWebGazer();
  _webgazerStarted = true;
  await webgazer.begin();
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
