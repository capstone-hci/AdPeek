export const API_ENDPOINT = {
  EEG: {
    CONNECT: '/eeg/connect',
  },
  SESSION: {
    START: '/session/start',
    STOP: '/session/stop',
  },
  GAZE: '/gaze',
  RESULT: (adId: string) => `/result/${adId}`,
  DASHBOARD: (adId: string) => `/dashboard/${adId}`,
  STATS: '/stats',
};
