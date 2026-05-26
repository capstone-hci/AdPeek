/**
 * hooks/useSurveyForm.ts — 설문 폼 상태 관리.
 */
import { useState } from 'react';
import type {
  EmotionAnswer,
  RecallAnswer,
  SurveyAnswers,
} from '../types/survey';

const INITIAL_ANSWERS: SurveyAnswers = {
  recall: 'remember',
  preference: 4,
  emotion: 'positive',
  opinion: '',
};

export const useSurveyForm = () => {
  const [answers, setAnswers] = useState<SurveyAnswers>(INITIAL_ANSWERS);

  const setRecall = (recall: RecallAnswer) => {
    setAnswers((prev) => ({ ...prev, recall }));
  };

  const setPreference = (preference: number) => {
    setAnswers((prev) => ({ ...prev, preference }));
  };

  const setEmotion = (emotion: EmotionAnswer) => {
    setAnswers((prev) => ({ ...prev, emotion }));
  };

  const setOpinion = (opinion: string) => {
    setAnswers((prev) => ({ ...prev, opinion }));
  };

  return {
    answers,
    setRecall,
    setPreference,
    setEmotion,
    setOpinion,
  };
};
