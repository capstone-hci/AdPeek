import { useRef, useEffect, useState, type RefObject } from 'react';
import { useCalibration } from '../hooks/useCalibration';
import { CALIBRATION_POINTS } from '../constants/calibration.constants';
import type { CalibrationStatus } from '../types/calibration.types';

// CalibrationView 렌더링용 % 좌표 (nx*100, ny*100)
const DISPLAY_POINTS = CALIBRATION_POINTS.map((p) => ({
  x: p.nx * 100,
  y: p.ny * 100,
}));

type CalibrationProps = {
  onPrev: () => void;
  onComplete: (accuracy: number, meanErrorPx: number) => void;
};

type CalibrationViewProps = {
  gaze: { x: number; y: number };
  currentIndex: number;
  isRecording: boolean;
  onPrev: () => void;
  onAreaClick: () => void;
  areaRef: RefObject<HTMLDivElement | null>;
  status: CalibrationStatus;
  validationPoint: { nx: number; ny: number } | null;
};

const CalibrationView = (props: CalibrationViewProps) => {
  const {
    gaze,
    currentIndex,
    isRecording,
    onPrev,
    onAreaClick,
    areaRef,
    status,
    validationPoint,
  } = props;

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
              STEP 2 / 5 ·{' '}
              {status === 'validating' ? '정확도 검증 중' : '캘리브레이션 중'}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              {status === 'validating'
                ? '파란 점을 바라봐 주세요'
                : isRecording
                  ? '기록 중...'
                  : '점을 응시한 채로 클릭해주세요'}
            </div>
          </div>

          {status === 'calibrating' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {DISPLAY_POINTS.map((_, index) => (
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
                style={{ fontSize: 14, color: 'var(--text2)', fontWeight: 600 }}
              >
                <span style={{ color: 'var(--accent)' }}>
                  {currentIndex + 1}
                </span>{' '}
                / {DISPLAY_POINTS.length}
              </div>
            </div>
          )}
        </div>

        <div
          ref={areaRef}
          onClick={
            status === 'calibrating' && !isRecording ? onAreaClick : undefined
          }
          style={{
            position: 'relative',
            background: 'var(--surface)',
            borderRadius: 20,
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            boxShadow: 'var(--shadow-lg)',
            cursor:
              status === 'calibrating' && !isRecording
                ? 'crosshair'
                : 'default',
          }}
        >
          {/* 캘리브레이션 포인트 */}
          {status === 'calibrating' &&
            DISPLAY_POINTS.map((point, index) => {
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
                        : isCurrent && isRecording
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
                    {isCurrent && !isRecording && (
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
                    {isCurrent && isRecording && (
                      <div
                        style={{
                          position: 'absolute',
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          border: '2px solid var(--success)',
                          opacity: 0.6,
                          animation: 'pulse 0.5s ease infinite',
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}

          {/* 검증 포인트 */}
          {status === 'validating' && validationPoint && (
            <div
              style={{
                position: 'absolute',
                left: `${validationPoint.nx * 100}%`,
                top: `${validationPoint.ny * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 20px rgba(99,102,241,0.6)',
                animation: 'pulse 1s ease infinite',
              }}
            />
          )}

          {/* 빨간 점: WebGazer 시선 예측 위치 */}
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
            현재 시선 위치
          </div>
        </div>

        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
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
};

/**
 * useCalibration: 시간 기반 자동 기록 방식
 * - 300ms 간격으로 recordScreenPosition 호출 → WebGazer 예측 없어도 학습 데이터 쌓임
 * - 학습 완료 후 검증(validating) → done/failed
 */
const Calibration = (props: CalibrationProps) => {
  const { onPrev, onComplete } = props;
  const calibrationAreaRef = useRef<HTMLDivElement>(null);

  const {
    status,
    currentPointIndex,
    isRecording,
    currentValidationPoint,
    gazeData,
    result,
    start,
    retry,
    handleCalibrationClick,
  } = useCalibration(calibrationAreaRef);

  // gazeData(픽셀) → 캘리브레이션 영역 기준 % 변환
  const [gaze, setGaze] = useState({ x: 50, y: 50 });
  useEffect(() => {
    if (!gazeData || !calibrationAreaRef.current) return;
    const rect = calibrationAreaRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    setGaze({
      x: Math.min(
        100,
        Math.max(0, ((gazeData.x - rect.left) / rect.width) * 100)
      ),
      y: Math.min(
        100,
        Math.max(0, ((gazeData.y - rect.top) / rect.height) * 100)
      ),
    });
  }, [gazeData]);

  // 마운트 시 자동 시작
  useEffect(() => {
    start();
  }, [start]);

  // onComplete ref: 부모가 매 렌더마다 새 함수를 넘겨도 루프 방지
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // 완료 시 다음 단계로 — result와 함께 전달
  useEffect(() => {
    if (status === 'done' && result) {
      onCompleteRef.current(result.accuracy, result.meanErrorPx);
    }
  }, [status, result]);

  // 정확도 부족 시 재시도 화면
  if (status === 'failed') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <p style={{ fontSize: 18, fontWeight: 700 }}>
          캘리브레이션 정확도 부족
        </p>
        <p style={{ fontSize: 14, color: 'var(--text2)' }}>
          정확도 {result?.accuracy}% · 평균 오차 {result?.meanErrorPx}px
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            onClick={onPrev}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: 'none',
              background: 'var(--surface)',
              boxShadow: 'inset 0 0 0 1px var(--border)',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            안내로 돌아가기
          </button>
          <button
            onClick={retry}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: 'none',
              background: 'var(--accent)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <CalibrationView
      gaze={gaze}
      currentIndex={currentPointIndex}
      isRecording={isRecording}
      onPrev={onPrev}
      onAreaClick={handleCalibrationClick}
      areaRef={calibrationAreaRef}
      status={status}
      validationPoint={currentValidationPoint}
    />
  );
};

export default Calibration;
