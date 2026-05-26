import { channels } from '../constants/channels';
import { makeWavePoints } from '../utils/wave';

type EegChannelStatusProps = {
  channelValues: number[];
  waveData: number[][];
};

const EegChannelStatus = (props: EegChannelStatusProps) => {
  const { channelValues, waveData } = props;

  return (
    <div
      style={{
        background: 'var(--surface)',
        borderRadius: 18,
        boxShadow: 'inset 0 0 0 1px var(--border2)',
        padding: 28,
        marginBottom: 16,
        animation: 'fadeIn 0.4s ease',
      }}
    >
      <h4
        style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 16,
          color: 'var(--text2)',
        }}
      >
        EEG 채널 신호 상태
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {channels.map((channel, index) => (
          <div
            key={channel.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: channel.color,
                width: 32,
                flexShrink: 0,
              }}
            >
              {channel.name}
            </span>

            <div
              style={{
                flex: 1,
                background: 'rgb(248, 248, 246)',
                borderRadius: 6,
                overflow: 'hidden',
              }}
            >
              <svg
                width="100%"
                height="40"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
              >
                <polyline
                  points={makeWavePoints(waveData[index])}
                  stroke={channel.color}
                  strokeWidth={1.5}
                  fill="none"
                  opacity={0.8}
                />
              </svg>
            </div>

            <span
              style={{
                fontSize: 11,
                color: 'var(--text3)',
                width: 48,
                textAlign: 'right',
              }}
            >
              {channelValues[index]} μV
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EegChannelStatus;
