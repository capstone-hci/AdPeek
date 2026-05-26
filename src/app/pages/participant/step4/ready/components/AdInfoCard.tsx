type AdInfoCardProps = {
  name: string;
  durationSeconds: number;
};

const AdInfoCard = ({ name, durationSeconds }: AdInfoCardProps) => (
  <div
    style={{
      background: 'rgb(26, 26, 36)',
      borderRadius: 12,
      padding: '20px 24px',
      marginBottom: 28,
      textAlign: 'left',
    }}
  >
    <div
      style={{
        color: 'rgb(102, 102, 102)',
        fontSize: 12,
        marginBottom: 8,
      }}
    >
      광고 정보
    </div>

    <div
      style={{
        color: '#fff',
        fontWeight: 600,
        fontSize: 16,
      }}
    >
      {name}
    </div>

    <div
      style={{
        color: 'rgb(102, 102, 102)',
        fontSize: 13,
        marginTop: 4,
      }}
    >
      재생 시간: {durationSeconds}초
    </div>
  </div>
);

export default AdInfoCard;
