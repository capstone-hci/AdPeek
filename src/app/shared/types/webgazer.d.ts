// window.webgazer 전역 타입 선언

interface GazeData {
  x: number;
  y: number;
}

type GazeListener = (data: GazeData | null, elapsedTime: number) => void;

interface WebGazerInstance {
  begin(): Promise<WebGazerInstance>;
  end(): void;
  pause(): WebGazerInstance;
  resume(): WebGazerInstance;
  setGazeListener(listener: GazeListener | null): WebGazerInstance;
  clearGazeListener(): WebGazerInstance;
  addMouseEventListeners(): WebGazerInstance;
  removeMouseEventListeners(): WebGazerInstance;
  getCurrentPrediction(): Promise<GazeData | null>;
  setRegression(
    type: 'ridge' | 'weightedRidge' | 'threadedRidge'
  ): WebGazerInstance;
  setTracker(type: 'TFFacemesh'): WebGazerInstance;
  recordScreenPosition(x: number, y: number, type?: string): void;
  clearData(): void;
  showVideoPreview(show: boolean): WebGazerInstance;
  showPredictionPoints(show: boolean): WebGazerInstance;
  saveDataAcrossSessions(save: boolean): WebGazerInstance;
  applyKalmanFilter(apply: boolean): WebGazerInstance;
  isReady(): boolean;
  params: {
    faceMeshSolutionPath: string;
    [key: string]: unknown;
  };
}

interface Window {
  webgazer: WebGazerInstance;
}
