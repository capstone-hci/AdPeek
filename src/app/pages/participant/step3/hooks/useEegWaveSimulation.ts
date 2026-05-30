import { useEffect, useState } from 'react';
import { channels } from '../constants/channels';
import { createInitialWave } from '../utils/wave';

export const useEegWaveSimulation = (isConnected: boolean) => {
  const [channelValues, setChannelValues] = useState([27, 64, 31, 52]);
  const [waveData, setWaveData] = useState(() =>
    channels.map((_, index) => createInitialWave(index))
  );

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setChannelValues((prev) => {
        const next = prev.map((value) => {
          const updated = value + (Math.random() * 8 - 4);
          return Math.max(15, Math.min(80, Math.round(updated)));
        });

        setWaveData((waves) =>
          waves.map((history, index) => {
            const amplitude = ((next[index] - 47.5) / 32.5) * 11;
            const noise = (Math.random() - 0.5) * 4;
            const y = 20 + amplitude + noise;
            const clamped = Math.max(4, Math.min(36, y));

            return [...history.slice(1), clamped];
          })
        );

        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isConnected]);

  return { channelValues, waveData };
};
