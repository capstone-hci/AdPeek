const MuseIcon = () => (
  <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
    <path
      d="M3 12C3 7 7 3 15 3C23 3 27 7 27 12"
      stroke="var(--accent2)"
      strokeWidth={2.5}
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="3" cy="13" r="3" fill="var(--accent2)" opacity={0.7} />
    <circle cx="27" cy="13" r="3" fill="var(--accent2)" opacity={0.7} />
    <line
      x1="3"
      y1="13"
      x2="8"
      y2="13"
      stroke="var(--accent2)"
      strokeWidth={1.5}
    />
    <line
      x1="22"
      y1="13"
      x2="27"
      y2="13"
      stroke="var(--accent2)"
      strokeWidth={1.5}
    />
  </svg>
);

export default MuseIcon;
