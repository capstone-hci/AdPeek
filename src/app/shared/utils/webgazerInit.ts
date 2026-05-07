export interface WebGazerInitOptions {
  onGaze?: GazeListener;
  showVideo?: boolean;
  showPredictionPoints?: boolean;
  saveDataAcrossSessions?: boolean;
  applyKalmanFilter?: boolean;
}

export function initWebGazer(options: WebGazerInitOptions = {}): void {
  const {
    onGaze,
    showVideo = false,
    showPredictionPoints = false,
    saveDataAcrossSessions = false,
    applyKalmanFilter = false,
  } = options;

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

export function destroyWebGazer(): void {
  if (!window.webgazer) return;
  try {
    window.webgazer.clearGazeListener();
    window.webgazer.end();
  } catch (e) {
    console.warn('webgazer 종료 중 오류:', e);
    alert('webgazer 종료 중 오류:');
  }
}
