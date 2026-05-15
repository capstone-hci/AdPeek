/**
 * utils/formatTime.ts — 초 단위 시간을 mm:ss 문자열로 변환
 * ViewTimer 등 재생 시간 표시에 사용
 */
export const formatTime = (sec: number) => {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');

  return `${m}:${s}`;
};
