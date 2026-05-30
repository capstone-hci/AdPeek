import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@shared/apis/config/axiosInstance';
import { API_ENDPOINT } from '@shared/apis/constants/apiEndpoints';

interface ConnectResponse {
  connected: boolean;
  message: string;
}

const getConnect = async (): Promise<ConnectResponse> => {
  const { data } = await axiosInstance.get(API_ENDPOINT.EEG.CONNECT);
  return data;
};

export const useConnectQuery = () => {
  return useQuery({
    queryKey: ['eeg', 'connect'],
    queryFn: getConnect,
    enabled: false,
  });
};
