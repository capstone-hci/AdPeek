/**
 * constants/campaigns.ts — 광고 캠페인 목록.
 */
import type { Campaign } from '../types/dashboard';

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'ad_001',
    name: '광고 A',
    title: '[제21회 대한민국 중소기업 광고공모전] 영창에코',
    durationSec: 30,
    color: 'rgb(49, 130, 246)',
  },
  {
    id: 'ad_002',
    name: '광고 B',
    title: '친환경 생수 캠페인',
    durationSec: 15,
    color: 'rgb(139, 92, 246)',
  },
  {
    id: 'ad_003',
    name: '광고 C',
    title: '모빌리티 앱 캠페인',
    durationSec: 60,
    color: 'rgb(0, 200, 150)',
  },
];

export const DEFAULT_AD_ID = CAMPAIGNS[0].id;

export const getCampaignMeta = (
  campaign: Campaign,
  participantCount?: number
) =>
  participantCount !== undefined
    ? `${campaign.durationSec}초 · ${participantCount}명`
    : `${campaign.durationSec}초`;
