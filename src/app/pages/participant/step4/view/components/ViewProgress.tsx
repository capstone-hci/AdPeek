/**
 * components/ViewProgress.tsx — 영상 하단 시청 진행률 바·진행률/남은 시간 텍스트
 */
type ViewProgressProps = {
  progress: number;
  remain: number;
};

const ViewProgress = ({ progress, remain }: ViewProgressProps) => (
  <>
    <div
      style={{
        background: 'rgb(26,26,36)',
        borderRadius: 8,
        height: 6,
        overflow: 'hidden',
        marginBottom: 12,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'var(--accent)',
          transition: 'width 1s linear',
        }}
      />
    </div>

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        color: 'rgb(102,102,102)',
        fontSize: 12,
      }}
    >
      <span>진행률 {Math.round(progress)}%</span>
      <span>남은 시간: {remain}초</span>
    </div>
  </>
);

export default ViewProgress;
