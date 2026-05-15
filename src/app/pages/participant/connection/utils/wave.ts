export const WAVE_LENGTH = 48;

export const createInitialWave = (channelIndex: number) =>
  Array.from({ length: WAVE_LENGTH }, (_, index) => {
    return 20 + Math.sin(index * 0.5 + channelIndex) * 8;
  });

export const makeWavePoints = (history: number[]) =>
  history
    .map((y, index) => {
      const x = (index / (history.length - 1)) * 100;
      return `${x},${y}`;
    })
    .join(' ');
