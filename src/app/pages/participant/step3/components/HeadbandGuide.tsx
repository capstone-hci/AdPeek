const HeadbandGuide = () => (
  <svg width="100%" height="140" viewBox="0 0 200 140" fill="none">
    <ellipse
      cx="100"
      cy="80"
      rx="60"
      ry="42"
      stroke="var(--text3)"
      strokeWidth={1.5}
      opacity={0.4}
    />
    <path
      d="M40 70C40 40 70 25 100 25C130 25 160 40 160 70"
      stroke="var(--accent2)"
      strokeWidth={3}
      strokeLinecap="round"
    />
    <circle cx="75" cy="40" r="5" fill="var(--accent2)" />
    <circle cx="125" cy="40" r="5" fill="var(--accent2)" />
    <circle cx="42" cy="78" r="5" fill="var(--accent2)" opacity={0.7} />
    <circle cx="158" cy="78" r="5" fill="var(--accent2)" opacity={0.7} />
    <text x="75" y="30" textAnchor="middle" fontSize={9} fill="var(--text3)">
      AF7
    </text>
    <text x="125" y="30" textAnchor="middle" fontSize={9} fill="var(--text3)">
      AF8
    </text>
    <text x="30" y="82" textAnchor="middle" fontSize={9} fill="var(--text3)">
      TP9
    </text>
    <text x="172" y="82" textAnchor="middle" fontSize={9} fill="var(--text3)">
      TP10
    </text>
  </svg>
);

export default HeadbandGuide;
