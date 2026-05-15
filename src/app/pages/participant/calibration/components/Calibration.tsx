import { useRef, type RefObject } from 'react';

import { useSimulatedPointerGaze } from '../hooks/useSimulatedPointerGaze';

const CALIBRATION_POINTS = [
  { x: 10, y: 10 },
  { x: 50, y: 10 },
  { x: 90, y: 10 },
  { x: 10, y: 50 },
  { x: 50, y: 50 },
  { x: 90, y: 50 },
  { x: 10, y: 90 },
  { x: 50, y: 90 },
  { x: 90, y: 90 },
];

type CalibrationProps = {
  onPrev: () => void;
  onComplete: () => void;
};

type CalibrationViewProps = {
  gaze: { x: number; y: number };
  currentIndex: number;
  onPrev: () => void;
  areaRef: RefObject<HTMLDivElement | null>;
};

function CalibrationView({
  gaze,
  currentIndex,
  onPrev,
  areaRef,
}: CalibrationViewProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        padding: 32,
        animation: 'fadeIn 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 1100, width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--text3)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                marginBottom: 4,
              }}
            >
              STEP 2 / 5 · 측정 중
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              나타나는 점을 정확히 응시해주세요
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {CALIBRATION_POINTS.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background:
                      index < currentIndex
                        ? 'var(--success)'
                        : index === currentIndex
                          ? 'var(--accent)'
                          : 'var(--border)',
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>

            <div
              style={{
                fontSize: 14,
                color: 'var(--text2)',
                fontWeight: 600,
              }}
            >
              <span style={{ color: 'var(--accent)' }}>{currentIndex + 1}</span>{' '}
              / 9
            </div>
          </div>
        </div>

        <div
          ref={areaRef}
          style={{
            position: 'relative',
            background: 'var(--surface)',
            borderRadius: 20,
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            boxShadow: 'var(--shadow-lg)',
            cursor: 'crosshair',
          }}
        >
          {CALIBRATION_POINTS.map((point, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div
                key={`${point.x}-${point.y}`}
                style={{
                  position: 'absolute',
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  style={{
                    width: isCurrent ? 32 : 20,
                    height: isCurrent ? 32 : 20,
                    borderRadius: '50%',
                    background: isCompleted
                      ? 'var(--success)'
                      : isCurrent
                        ? 'var(--accent)'
                        : 'var(--border)',
                    transition: 'all 0.3s var(--ease)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isCompleted && (
                    <svg width="11" height="9" viewBox="0 0 10 8">
                      <path
                        d="M1 3.5L3.5 6L9 1"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}

                  {isCurrent && (
                    <div
                      style={{
                        position: 'absolute',
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        border: '2px solid var(--accent)',
                        opacity: 0.4,
                        animation: 'pulse 1s ease infinite',
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}

          <div
            style={{
              position: 'absolute',
              left: `${gaze.x}%`,
              top: `${gaze.y}%`,
              transform: 'translate(-50%, -50%)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: 'rgba(240, 68, 82, 0.75)',
              boxShadow: '0 0 16px rgba(240, 68, 82, 0.5)',
              transition: 'left 0.06s, top 0.06s',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 8,
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 11,
              color: 'var(--text2)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--danger)',
              }}
            />
            현재 시선 위치 (마우스 시뮬)
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <button
            type="button"
            onClick={onPrev}
            style={{
              border: 'none',
              color: 'var(--text2)',
              padding: '12px 20px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              background: 'var(--surface)',
              boxShadow: 'inset 0 0 0 1px var(--border)',
              cursor: 'pointer',
            }}
          >
            안내로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * WebGazer 등 실제 시선 연동 시: 아래 블록만 제거·교체하면 됩니다.
 * (`useSimulatedPointerGaze` → 실측 훅 + 동일한 `gaze` / `currentIndex` 형태 권장)
 */
export default function Calibration({ onPrev, onComplete }: CalibrationProps) {
  const calibrationAreaRef = useRef<HTMLDivElement>(null);

  const { gaze, currentIndex } = useSimulatedPointerGaze(
    calibrationAreaRef,
    CALIBRATION_POINTS,
    onComplete
  );

  return (
    <CalibrationView
      gaze={gaze}
      currentIndex={currentIndex}
      onPrev={onPrev}
      areaRef={calibrationAreaRef}
    />
  );
}
