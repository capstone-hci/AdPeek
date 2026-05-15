import HeadbandGuide from './HeadbandGuide';

const ConnectionSidebar = () => (
  <aside style={{ position: 'sticky', top: 40 }}>
    <div
      style={{
        fontSize: 11,
        color: 'var(--text3)',
        fontWeight: 600,
        letterSpacing: '0.12em',
        marginBottom: 12,
      }}
    >
      STEP 3 / 5
    </div>

    <h2
      style={{
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.15,
        marginBottom: 16,
      }}
    >
      Muse 헤드밴드
      <br />
      연결
    </h2>

    <p
      style={{
        color: 'var(--text2)',
        fontSize: 15,
        lineHeight: 1.7,
        marginBottom: 28,
      }}
    >
      전두엽(AF7·AF8)과 측두엽(TP9·TP10) 4채널에서 뇌파를 측정합니다. 연결 전
      헤드밴드가 머리에 밀착되어 있는지 확인해주세요.
    </p>

    <div
      style={{
        background: 'var(--bg2)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
      }}
    >
      <HeadbandGuide />
      <div
        style={{
          fontSize: 12,
          color: 'var(--text3)',
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        4채널 EEG 센서 위치
      </div>
    </div>

    <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.7 }}>
      연결이 안 되시나요? 헤드밴드 전원을 다시 켜고, 센서 패드에 약간의 물을
      묻혀 피부 접촉을 개선해보세요.
    </div>
  </aside>
);

export default ConnectionSidebar;
