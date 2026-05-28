/**
 * constants/campaigns.ts — 광고 캠페인 더미 데이터.
 */
import type { Campaign } from '../types/dashboard';

export const CAMPAIGNS: Campaign[] = [
  {
    name: '광고 A',
    meta: '30초 · 12명',
    color: 'rgb(49, 130, 246)',
    active: true,
  },
  {
    name: '광고 B',
    meta: '15초 · 8명',
    color: 'rgb(139, 92, 246)',
    active: false,
  },
  {
    name: '광고 C',
    meta: '60초 · 6명',
    color: 'rgb(0, 200, 150)',
    active: false,
  },
];
