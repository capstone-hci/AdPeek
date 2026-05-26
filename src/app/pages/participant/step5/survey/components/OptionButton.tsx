/**
 * components/OptionButton.tsx — 라디오 스타일 선택 버튼.
 */
type OptionButtonProps = {
  selected: boolean;
  label: string;
  description?: string;
  color?: 'blue' | 'green';
  onClick: () => void;
};

const OptionButton = ({
  selected,
  label,
  description,
  color = 'blue',
  onClick,
}: OptionButtonProps) => {
  const activeColor = color === 'green' ? 'rgb(35, 190, 125)' : 'var(--accent)';
  const activeBg =
    color === 'green' ? 'rgb(232, 252, 241)' : 'var(--accent-soft)';

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minWidth: 150,
        flex: 1,
        border: selected
          ? `1.5px solid ${activeColor}`
          : '1.5px solid var(--border)',
        borderRadius: 10,
        background: selected ? activeBg : '#fff',
        padding: '13px 14px',
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            border: selected
              ? `5px solid ${activeColor}`
              : '1.5px solid var(--border)',
            background: '#fff',
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: selected ? activeColor : 'var(--text2)',
            }}
          >
            {label}
          </div>
          {description && (
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>
              {description}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default OptionButton;
