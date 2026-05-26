/**
 * constants/questions.ts — 설문 문항·선택지 정의.
 */
import type { EmotionAnswer, RecallAnswer } from '../types/survey';

export const OPINION_MAX_LENGTH = 500;

export const PREFERENCE_SCORES = [1, 2, 3, 4, 5] as const;

export const RECALL_OPTIONS: {
  value: RecallAnswer;
  label: string;
}[] = [
  { value: 'remember', label: '네, 기억나요' },
  { value: 'unclear', label: '잘 모르겠어요' },
  { value: 'notRemember', label: '기억나지 않아요' },
];

export const EMOTION_OPTIONS: {
  value: EmotionAnswer;
  label: string;
  description: string;
  color?: 'green';
}[] = [
  {
    value: 'positive',
    label: '긍정적이에요',
    description: '좋은 인상을 받았어요',
    color: 'green',
  },
  {
    value: 'neutral',
    label: '중립이에요',
    description: '특별한 감정 없음',
  },
  {
    value: 'negative',
    label: '부정적이에요',
    description: '불편함을 느꼈어요',
  },
];

export const SURVEY_QUESTIONS = {
  recall: {
    number: 'Q1',
    title: '방금 시청한 광고가 기억나시나요?',
  },
  preference: {
    number: 'Q2',
    title: '이 브랜드에 대한 호감도는 어느 정도인가요?',
    description: '1점 (매우 낮음) - 5점 (매우 높음)',
  },
  emotion: {
    number: 'Q3',
    title: '광고를 보고 어떤 감정을 느끼셨나요?',
  },
  opinion: {
    number: 'Q4',
    title: '광고에 대해 자유롭게 의견을 남겨주세요.',
    description: '선택 사항입니다.',
  },
} as const;
