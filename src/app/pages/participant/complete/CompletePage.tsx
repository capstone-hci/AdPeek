/**
 * CompletePage — 참여자 광고 시청 완료 페이지.
 * 완료 메시지·결과 보기 버튼을 표시하고, CTA 클릭 시 마케터 대시보드로 이동한다.
 */
import { useNavigate } from 'react-router-dom';
import { paths } from '@app/routes/path';
import CompleteMessage from './components/CompleteMessage';
import ResultButton from './components/ResultButton';
import SuccessIcon from './components/SuccessIcon';

const CompletePage = () => {
  const navigate = useNavigate();

  const handleResult = () => {
    navigate(paths.dashboard);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'rgb(10, 10, 15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        animation: 'fadeIn 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: 440,
          textAlign: 'center',
        }}
      >
        <SuccessIcon />
        <CompleteMessage />
        <ResultButton onClick={handleResult} />
      </div>
    </div>
  );
};

export default CompletePage;
