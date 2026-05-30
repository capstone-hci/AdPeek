/**
 * components/DashboardMain.tsx — 헤더·본문 영역.
 */
import type { Campaign, DashboardResponse } from '../types/dashboard';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';

type DashboardMainProps = {
  campaign: Campaign;
  dashboard?: DashboardResponse;
  isPending: boolean;
  isError: boolean;
};

const DashboardMain = ({
  campaign,
  dashboard,
  isPending,
  isError,
}: DashboardMainProps) => (
  <main style={{ flex: 1, minWidth: 0 }}>
    <DashboardHeader campaign={campaign} />
    <DashboardOverview
      campaign={campaign}
      dashboard={dashboard}
      isPending={isPending}
      isError={isError}
    />
  </main>
);

export default DashboardMain;
