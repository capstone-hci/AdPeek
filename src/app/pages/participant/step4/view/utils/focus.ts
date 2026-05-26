/**
 * utils/focus.ts — EEG 집중도(%) 더미 값 생성
 * simulation 상수 범위 안에서 randomFocus()로 반환
 */
import { FOCUS_SIMULATION } from '../constants/simulation';

export const randomFocus = () =>
  Math.max(
    FOCUS_SIMULATION.min,
    Math.min(
      FOCUS_SIMULATION.max,
      Math.round(FOCUS_SIMULATION.base + Math.random() * FOCUS_SIMULATION.range)
    )
  );
