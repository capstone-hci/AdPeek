/**
 * DashboardPage — 마케터 분석 대시보드.
 */
import { useState } from 'react';
import { useDashboardQuery } from './apis/useDashboardQuery';
import DashboardMain from './components/DashboardMain';
import DashboardSidebar from './components/DashboardSidebar';
import { CAMPAIGNS, DEFAULT_AD_ID } from './constants/campaigns';

const DashboardPage = () => {
  const [selectedAdId, setSelectedAdId] = useState(DEFAULT_AD_ID);
  const { data, isPending, isError } = useDashboardQuery(selectedAdId);
  const selectedCampaign =
    CAMPAIGNS.find((campaign) => campaign.id === selectedAdId) ?? CAMPAIGNS[0];

  return (
    <div
      style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}
    >
      <DashboardSidebar
        campaigns={CAMPAIGNS}
        selectedAdId={selectedAdId}
        participantCount={data?.participant_count}
        onSelect={setSelectedAdId}
      />
      <DashboardMain
        campaign={selectedCampaign}
        dashboard={data}
        isPending={isPending}
        isError={isError}
      />
    </div>
  );
};

export default DashboardPage;
