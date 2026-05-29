import axiosInstance from './config/axiosInstance';
import { API_ENDPOINT } from './constants/apiEndpoints';

type SessionPayload = {
  ad_id: string;
};

export const postSessionStart = (payload: SessionPayload) =>
  axiosInstance.post(API_ENDPOINT.SESSION.START, payload);

export const postSessionStop = (payload: SessionPayload) =>
  axiosInstance.post(API_ENDPOINT.SESSION.STOP, payload);
