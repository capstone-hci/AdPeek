/**
 * types/survey.ts — 설문 응답 타입.
 */
export type RecallAnswer = 'remember' | 'unclear' | 'notRemember';

export type EmotionAnswer = 'positive' | 'neutral' | 'negative';

export type SurveyAnswers = {
  recall: RecallAnswer;
  preference: number;
  emotion: EmotionAnswer;
  opinion: string;
};
