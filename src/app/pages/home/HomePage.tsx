import { useGazer } from '@shared/hooks/useGazer';

const HomePage = () => {
  const { begin, end, pause, resume, isRunning, gazeData } = useGazer();

  return (
    <div>
      <p>상태: {isRunning ? '추적 중' : '중지됨'}</p>
      <p>
        {gazeData
          ? `x: ${Math.round(gazeData.x)}, y: ${Math.round(gazeData.y)}`
          : '시선 데이터가 없습니다.'}
      </p>
      <button onClick={begin}>시작</button>
      <button onClick={pause}>일시정지</button>
      <button onClick={resume}>재개</button>
      <div>
        <button onClick={end}>종료</button>
      </div>
    </div>
  );
};

export default HomePage;
