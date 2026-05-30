import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@shared/apis/config/axiosInstance';
import { API_ENDPOINT } from '@shared/apis/constants/apiEndpoints';

interface StatsResponse {
  total_participants: number;
  total_ads: number;
  avg_attention: number;
}

const getStats = async (): Promise<StatsResponse> => {
  const { data } = await axiosInstance.get(API_ENDPOINT.STATS);
  return data;
};

export const useStatsQuery = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
  });
};
