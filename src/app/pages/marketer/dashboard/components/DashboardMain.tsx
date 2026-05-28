/**
 * components/DashboardMain.tsx — 헤더·본문 영역.
 */
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';

const DashboardMain = () => (
  <main style={{ flex: 1, minWidth: 0 }}>
    <DashboardHeader />
    <DashboardOverview />
  </main>
);

export default DashboardMain;
