export interface GazeData {
  x: number;
  y: number;
}

export type GazeListener = (data: GazeData | null, elapsedTime: number) => void;

export type RegressionType = 'ridge' | 'weightedRidge' | 'threadedRidge';
export type TrackerType = 'TFFacemesh';

export interface WebGazerInstance {
  begin(): Promise<WebGazerInstance>;
  end(): void;
  pause(): WebGazerInstance;
  resume(): WebGazerInstance;
  setGazeListener(listener: GazeListener | null): WebGazerInstance;
  clearGazeListener(): WebGazerInstance;
  getCurrentPrediction(): Promise<GazeData | null>;
  setRegression(type: RegressionType): WebGazerInstance;
  setTracker(type: TrackerType): WebGazerInstance;
  recordScreenPosition(x: number, y: number, type?: string): void;
  clearData(): void;
  showVideoPreview(show: boolean): WebGazerInstance;
  showPredictionPoints(show: boolean): WebGazerInstance;
  saveDataAcrossSessions(save: boolean): WebGazerInstance;
  applyKalmanFilter(apply: boolean): WebGazerInstance;
  isReady(): boolean;
}

declare global {
  interface Window {
    webgazer: WebGazerInstance;
  }
}
