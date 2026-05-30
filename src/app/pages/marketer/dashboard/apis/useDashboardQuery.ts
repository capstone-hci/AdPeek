import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@shared/apis/config/axiosInstance';
import { API_ENDPOINT } from '@shared/apis/constants/apiEndpoints';
import type { DashboardResponse } from '../types/dashboard';

const getDashboard = async (adId: string): Promise<DashboardResponse> => {
  const { data } = await axiosInstance.get(API_ENDPOINT.DASHBOARD(adId));
  return data;
};

export const useDashboardQuery = (adId: string) => {
  return useQuery({
    queryKey: ['dashboard', adId],
    queryFn: () => getDashboard(adId),
    enabled: Boolean(adId),
  });
};
