/**
 * types/survey.ts — 설문 응답 타입.
 */
export type RecallAnswer = 'remember' | 'unclear' | 'notRemember';

export type EmotionAnswer = 'positive' | 'neutral' | 'negative';

export type SurveyAnswers = {
  recall: RecallAnswer | null;
  preference: number | null;
  emotion: EmotionAnswer | null;
  opinion: string;
};

export const isSurveyComplete = (answers: SurveyAnswers): boolean =>
  answers.recall !== null &&
  answers.preference !== null &&
  answers.emotion !== null;
