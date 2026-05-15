import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';
import ConnectionActions from './components/ConnectionActions';
import ConnectionSidebar from './components/ConnectionSidebar';
import DeviceConnectionCard from './components/DeviceConnectionCard';
import EegChannelStatus from './components/EegChannelStatus';
import { useEegWaveSimulation } from './hooks/useEegWaveSimulation';

const ConnectionPage = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const { channelValues, waveData } = useEegWaveSimulation(isConnected);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        padding: '40px 48px',
        animation: 'fadeIn 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.15fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <ConnectionSidebar />

        <div style={{ width: '100%' }}>
          <DeviceConnectionCard
            isConnected={isConnected}
            onConnect={() => setIsConnected(true)}
          />

          {isConnected && (
            <EegChannelStatus
              channelValues={channelValues}
              waveData={waveData}
            />
          )}

          <ConnectionActions
            isConnected={isConnected}
            onPrev={() => navigate(paths.calibration)}
            onNext={() => navigate(paths.home)}
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectionPage;
