/**
 * components/GazeOverlay.tsx — 시선 궤적·현재 시선 SVG 오버레이
 * gazeTrail(과거 점)과 currentGaze(현재 점)를 영상 위에 그림
 */
import type { GazePoint } from '../types/gaze';

type GazeOverlayProps = {
  gazeTrail: GazePoint[];
  currentGaze: GazePoint;
};

const GazeOverlay = ({ gazeTrail, currentGaze }: GazeOverlayProps) => (
  <svg
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    }}
  >
    {gazeTrail.map((point, index) => (
      <circle
        key={index}
        cx={`${point.x}%`}
        cy={`${point.y}%`}
        r={3}
        fill="rgba(231,80,100,0.6)"
        opacity={index / gazeTrail.length}
      />
    ))}

    <circle
      cx={`${currentGaze.x}%`}
      cy={`${currentGaze.y}%`}
      r={8}
      fill="rgba(231,80,100,0.3)"
    />

    <circle
      cx={`${currentGaze.x}%`}
      cy={`${currentGaze.y}%`}
      r={4}
      fill="rgba(231,80,100,0.9)"
    />
  </svg>
);

export default GazeOverlay;
