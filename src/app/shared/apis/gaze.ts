import axiosInstance from './config/axiosInstance';
import { API_ENDPOINT } from './constants/apiEndpoints';
import type { RawGazePoint } from '@app/pages/participant/step4/view/types/gaze';

export type GazePayload = {
  ad_id: string;
  start_time: number; // Unix ms — 세션 시작 시각
  data: RawGazePoint[];
};

export const postGazeData = (payload: GazePayload) =>
  axiosInstance.post(API_ENDPOINT.GAZE, payload);
