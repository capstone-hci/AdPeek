import type { GazeListener } from '@shared/types/webgazer';

export interface WebGazerInitOptions {
  onGaze?: GazeListener;
  showVideo?: boolean;
  showPredictionPoints?: boolean;
  saveDataAcrossSessions?: boolean;
  applyKalmanFilter?: boolean;
}

export function initWebGazer(options: WebGazerInitOptions = {}): void {
  if (!window.webgazer) {
    throw new Error('[WebGazer] window.webgazer를 찾을 수 없습니다.');
  }

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
  window.webgazer.clearGazeListener();
  window.webgazer.end();
}
