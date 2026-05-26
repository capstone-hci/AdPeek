import { checklist } from '../constants/checklist';
import CheckIcon from './CheckIcon';
import MuseIcon from './MuseIcon';

type DeviceConnectionCardProps = {
  isConnected: boolean;
  onConnect: () => void;
};

const DeviceConnectionCard = (props: DeviceConnectionCardProps) => {
  const { isConnected, onConnect } = props;

  return (
    <div
      style={{
        background: 'var(--surface)',
        borderRadius: 18,
        boxShadow: 'inset 0 0 0 1px var(--border2)',
        padding: 28,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'rgb(240, 234, 250)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <MuseIcon />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Muse S (Gen 2)</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>
            4채널 EEG · Bluetooth LE
          </div>
        </div>

        <div
          style={{
            padding: '6px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            background: isConnected ? 'rgb(230, 247, 238)' : 'var(--bg2)',
            color: isConnected ? 'var(--success)' : 'var(--text3)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: isConnected ? 'var(--success)' : 'var(--text3)',
            }}
          />
          {isConnected ? '연결됨' : '연결 안됨'}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginBottom: isConnected ? 0 : 20,
        }}
      >
        {checklist.map((text, index) => {
          const checked = isConnected || index !== 2;

          return (
            <div
              key={text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 13,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: checked ? 'var(--success)' : 'var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {checked ? (
                  <CheckIcon />
                ) : (
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: 'var(--text3)',
                    }}
                  />
                )}
              </div>

              <span
                style={{
                  color: checked ? 'var(--text)' : 'var(--text3)',
                }}
              >
                {text}
              </span>
            </div>
          );
        })}
      </div>

      {!isConnected && (
        <button
          type="button"
          onClick={onConnect}
          style={{
            border: 'none',
            background: 'var(--accent)',
            color: '#fff',
            padding: '15px 28px',
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 600,
            width: '100%',
            letterSpacing: '-0.02em',
            transition:
              'background 0.15s var(--ease), transform 0.1s var(--ease)',
            cursor: 'pointer',
          }}
        >
          장치 연결하기
        </button>
      )}
    </div>
  );
};

export default DeviceConnectionCard;
