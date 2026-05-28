/**
 * constants/copy.ts — 대시보드 문구.
 */
export const DASHBOARD_COPY = {
  brand: 'AdPeek',
  campaigns: '광고 캠페인',
  breadcrumb: '대시보드 › 광고 캠페인 › 광고 A',
  campaignTitle: '브랜드 리론칭 캠페인',
  statusComplete: '분석 완료',
  user: {
    name: '마케터',
    org: 'HCI Lab',
    initial: 'M',
  },
  heatmap: {
    title: '시선 히트맵',
    subtitle: '전체 참여자 평균 · 0–30s',
    frameLabel: '광고 프레임',
    legendLow: '낮음',
    legendHigh: '높음',
  },
  eeg: {
    title: 'EEG 타임라인',
  },
  summary: {
    title: '데이터 요약',
    placeholder: '주요 지표 요약 영역입니다.',
    groups: ['시선 추적', '뇌파 (EEG)', '사후 설문'] as const,
  },
} as const;
