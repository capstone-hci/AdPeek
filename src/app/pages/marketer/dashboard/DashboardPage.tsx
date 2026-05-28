/**
 * DashboardPage — 마케터 분석 대시보드.
 */
import DashboardMain from './components/DashboardMain';
import DashboardSidebar from './components/DashboardSidebar';

const DashboardPage = () => (
  <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>
    <DashboardSidebar />
    <DashboardMain />
  </div>
);

export default DashboardPage;
