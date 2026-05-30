/**
 * constants/mockDashboard.ts — 대시보드 API 목 응답 (UI 미리보기용).
 */
import type { DashboardResponse } from '../types/dashboard';

const MOCK_HEATMAP_AD_001 = [
  { x: 0.52, y: 0.34 },
  { x: 0.55, y: 0.36 },
  { x: 0.58, y: 0.38 },
  { x: 0.54, y: 0.35 },
  { x: 0.6, y: 0.4 },
  { x: 0.62, y: 0.42 },
  { x: 0.65, y: 0.45 },
  { x: 0.63, y: 0.43 },
  { x: 0.48, y: 0.32 },
  { x: 0.5, y: 0.33 },
  { x: 0.72, y: 0.28 },
  { x: 0.74, y: 0.3 },
  { x: 0.76, y: 0.32 },
  { x: 0.38, y: 0.55 },
  { x: 0.4, y: 0.57 },
  { x: 0.42, y: 0.58 },
  { x: 0.82, y: 0.48 },
  { x: 0.84, y: 0.5 },
  { x: 0.28, y: 0.62 },
  { x: 0.3, y: 0.64 },
];

const MOCK_INSIGHTS_AD_001: DashboardResponse['insights'] = {
  attentionPercent: 65,
  recallRate: 50,
  gaze: {
    maxGazeRange: '3.2–5.1s',
    maxDwellTime: '2.1초',
    aoiRows: [
      { area: '인물 영역', dwell: '0.1초', count: 4 },
      { area: '제품 영역', dwell: '2.1초', count: 14 },
      { area: '텍스트/CTA', dwell: '1.3초', count: 8 },
    ],
  },
  eeg: {
    attentionPeakRange: '3.2–5.1s',
    arousalPeakRange: '8.5–9.8s',
  },
  survey: {
    recallRate: '50%',
    purchaseIntent: '4.5/5',
    positiveEmotion: '50%',
  },
};

export const MOCK_DASHBOARD_AD_001: DashboardResponse = {
  ad_id: 'ad_001',
  participant_count: 5,
  avg_attention: 6.53,
  avg_arousal: 12.67,
  heatmap_data: MOCK_HEATMAP_AD_001,
  scenes: [
    {
      scene: 1,
      start: 0,
      end: 1.67,
      description: '숲 배경, 등산객 뒷모습',
      avg_attention: 5.31,
      avg_arousal: 8.78,
      heatmap_data: MOCK_HEATMAP_AD_001.slice(0, 8),
    },
    {
      scene: 2,
      start: 1.67,
      end: 4.07,
      description: '남성 얼굴 클로즈업, 목 디스크/어깨 통증 텍스트',
      avg_attention: 6.12,
      avg_arousal: 9.1,
      heatmap_data: MOCK_HEATMAP_AD_001.slice(4, 12),
    },
    {
      scene: 3,
      start: 4.07,
      end: 5.97,
      description: '무릎 잡는 손·다리, 무릎 통증 텍스트',
      avg_attention: 5.85,
      avg_arousal: 10.2,
      heatmap_data: MOCK_HEATMAP_AD_001.slice(8, 14),
    },
    {
      scene: 4,
      start: 5.97,
      end: 8.04,
      description: '허리 숙인 남성, 제품 설명 자막',
      avg_attention: 4.92,
      avg_arousal: 8.45,
      heatmap_data: MOCK_HEATMAP_AD_001.slice(10, 16),
    },
    {
      scene: 5,
      start: 8.04,
      end: 8.88,
      description: '남성 얼굴, 신발 클로즈업, 깔창 꺼내는 손',
      avg_attention: 6.78,
      avg_arousal: 11.3,
      heatmap_data: MOCK_HEATMAP_AD_001.slice(6, 18),
    },
    {
      scene: 6,
      start: 8.88,
      end: 10.81,
      description: '깔창 손에 들고 있는 장면, 신발 본체',
      avg_attention: 7.15,
      avg_arousal: 10.85,
      heatmap_data: MOCK_HEATMAP_AD_001.slice(12, 20),
    },
    {
      scene: 7,
      start: 10.81,
      end: 11.58,
      description: '청년 신발 끈 묶는 모습',
      avg_attention: 5.4,
      avg_arousal: 9.6,
      heatmap_data: MOCK_HEATMAP_AD_001.slice(0, 6),
    },
    {
      scene: 8,
      start: 11.58,
      end: 12.58,
      description: '신발 끈 묶는 손 클로즈업, 운동화 클로즈업',
      avg_attention: 6.05,
      avg_arousal: 9.9,
      heatmap_data: MOCK_HEATMAP_AD_001.slice(2, 10),
    },
    {
      scene: 9,
      start: 12.58,
      end: 14.28,
      description: '걷는 발·운동화, 제품 효능 자막',
      avg_attention: 5.95,
      avg_arousal: 8.9,
      heatmap_data: MOCK_HEATMAP_AD_001.slice(14, 20),
    },
    {
      scene: 10,
      start: 14.28,
      end: 17.08,
      description: '가을 단풍 숲 드론뷰, 제품 효능 자막',
      avg_attention: 4.5,
      avg_arousal: 7.8,
      heatmap_data: [],
    },
    {
      scene: 11,
      start: 17.08,
      end: 17.85,
      description: '젊은 여성 얼굴 (웃는 표정)',
      avg_attention: 5.2,
      avg_arousal: 9.2,
      heatmap_data: [],
    },
    {
      scene: 12,
      start: 17.85,
      end: 18.92,
      description: '중년 남성 얼굴 (웃는 표정)',
      avg_attention: 5.8,
      avg_arousal: 9.5,
      heatmap_data: [],
    },
    {
      scene: 13,
      start: 18.92,
      end: 19.19,
      description: '핑크빛 화면전환 효과',
      avg_attention: null,
      avg_arousal: null,
      heatmap_data: [],
    },
    {
      scene: 14,
      start: 19.19,
      end: 20.72,
      description: '남성 얼굴·상반신 정면',
      avg_attention: 6.3,
      avg_arousal: 10.1,
      heatmap_data: [],
    },
    {
      scene: 15,
      start: 20.72,
      end: 30.03,
      description:
        '하늘·산 능선, 강 전경, 제로였던 내 삶에 새로운 활력이 찾아왔다 자막',
      avg_attention: 4.8,
      avg_arousal: 8.2,
      heatmap_data: [],
    },
  ],
  insights: MOCK_INSIGHTS_AD_001,
};

export const MOCK_DASHBOARD_AD_002: DashboardResponse = {
  ad_id: 'ad_002',
  participant_count: 8,
  avg_attention: 4.82,
  avg_arousal: 7.91,
  heatmap_data: [
    { x: 0.45, y: 0.5 },
    { x: 0.47, y: 0.52 },
    { x: 0.5, y: 0.48 },
    { x: 0.68, y: 0.35 },
    { x: 0.7, y: 0.37 },
    { x: 0.35, y: 0.6 },
  ],
  scenes: [
    {
      scene: 1,
      start: 0,
      end: 5,
      description: '브랜드 로고 인트로',
      avg_attention: 4.2,
      avg_arousal: 7.1,
      heatmap_data: [],
    },
    {
      scene: 2,
      start: 5,
      end: 10,
      description: '제품 사용 장면',
      avg_attention: 5.1,
      avg_arousal: 8.4,
      heatmap_data: [],
    },
    {
      scene: 3,
      start: 10,
      end: 15,
      description: 'CTA 엔딩',
      avg_attention: 4.9,
      avg_arousal: 7.6,
      heatmap_data: [],
    },
  ],
  insights: {
    attentionPercent: 48,
    recallRate: 71,
    gaze: {
      maxGazeRange: '5.0–10.0s',
      maxDwellTime: '1.8초',
      aoiRows: [
        { area: '제품 영역', dwell: '1.8초', count: 9 },
        { area: '텍스트/CTA', dwell: '1.0초', count: 5 },
      ],
    },
    eeg: {
      attentionPeakRange: '5.0–10.0s',
      arousalPeakRange: '5.0–10.0s',
    },
    survey: {
      recallRate: '71%',
      purchaseIntent: '3.2/5',
      positiveEmotion: '58%',
    },
  },
};

export const MOCK_DASHBOARD_AD_003: DashboardResponse = {
  ad_id: 'ad_003',
  participant_count: 6,
  avg_attention: 6.15,
  avg_arousal: 10.42,
  heatmap_data: [
    { x: 0.55, y: 0.45 },
    { x: 0.57, y: 0.47 },
    { x: 0.6, y: 0.5 },
    { x: 0.62, y: 0.52 },
    { x: 0.4, y: 0.4 },
    { x: 0.42, y: 0.42 },
    { x: 0.75, y: 0.55 },
    { x: 0.77, y: 0.57 },
  ],
  scenes: [
    {
      scene: 1,
      start: 0,
      end: 15,
      description: '스토리텔링 오프닝',
      avg_attention: 5.8,
      avg_arousal: 9.9,
      heatmap_data: [],
    },
    {
      scene: 2,
      start: 15,
      end: 35,
      description: '제품 기능 소개',
      avg_attention: 6.5,
      avg_arousal: 10.8,
      heatmap_data: [],
    },
    {
      scene: 3,
      start: 35,
      end: 60,
      description: '브랜드 메시지 마무리',
      avg_attention: 5.9,
      avg_arousal: 9.7,
      heatmap_data: [],
    },
  ],
  insights: {
    attentionPercent: 62,
    recallRate: 79,
    gaze: {
      maxGazeRange: '15.0–35.0s',
      maxDwellTime: '3.4초',
      aoiRows: [
        { area: '제품 영역', dwell: '3.4초', count: 11 },
        { area: '텍스트/CTA', dwell: '2.2초', count: 7 },
        { area: '배경 영역', dwell: '0.8초', count: 4 },
      ],
    },
    eeg: {
      attentionPeakRange: '15.0–35.0s',
      arousalPeakRange: '15.0–35.0s',
    },
    survey: {
      recallRate: '79%',
      purchaseIntent: '3.6/5',
      positiveEmotion: '61%',
    },
  },
};

export const MOCK_DASHBOARD_BY_AD_ID: Record<string, DashboardResponse> = {
  ad_001: MOCK_DASHBOARD_AD_001,
  ad_002: MOCK_DASHBOARD_AD_002,
  ad_003: MOCK_DASHBOARD_AD_003,
};

export const getMockDashboard = (adId: string): DashboardResponse =>
  MOCK_DASHBOARD_BY_AD_ID[adId] ?? MOCK_DASHBOARD_AD_001;

export const USE_DASHBOARD_MOCK =
  import.meta.env.VITE_USE_DASHBOARD_MOCK === 'true';
