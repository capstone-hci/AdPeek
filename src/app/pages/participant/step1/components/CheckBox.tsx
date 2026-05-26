type CheckBoxProps = { checked: boolean };

const CheckBox = ({ checked }: CheckBoxProps) => (
  <div
    style={{
      width: 20,
      height: 20,
      borderRadius: 5,
      flexShrink: 0,
      background: checked ? 'var(--accent)' : '#fff',
      border: checked
        ? '1.5px solid var(--accent)'
        : '1.5px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {checked && (
      <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
        <path
          d="M1 5L4.5 8.5L12 1"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </div>
);

export default CheckBox;
