/**
 * components/ViewTimer.tsx — 우상단 재생 시간 표시 (현재 / 전체, mm:ss)
 */
import { formatTime } from '../utils/formatTime';

type ViewTimerProps = {
  currentTime: number;
  totalDuration: number;
};

const ViewTimer = ({ currentTime, totalDuration }: ViewTimerProps) => (
  <div
    style={{
      position: 'absolute',
      top: 14,
      right: 14,
      background: 'rgba(0,0,0,0.7)',
      borderRadius: 8,
      padding: '6px 14px',
      color: '#fff',
      fontSize: 13,
      fontWeight: 600,
      backdropFilter: 'blur(4px)',
    }}
  >
    {formatTime(currentTime)} / {formatTime(totalDuration)}
  </div>
);

export default ViewTimer;
