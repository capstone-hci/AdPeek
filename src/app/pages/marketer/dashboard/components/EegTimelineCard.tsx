/**
 * components/EegTimelineCard.tsx — EEG 타임라인 카드.
 */
import { DASHBOARD_COPY } from '../constants/copy';
import type { DashboardResponse } from '../types/dashboard';
import { getMaxSceneTime } from '../utils/dashboardFormat';
import { buildEegTimeline } from '../utils/eegTimeline';

type EegTimelineCardProps = {
  dashboard?: DashboardResponse;
  isPending: boolean;
  isError: boolean;
};

const EegTimelineCard = ({
  dashboard,
  isPending,
  isError,
}: EegTimelineCardProps) => {
  const maxTime = dashboard ? getMaxSceneTime(dashboard) : 30;
  const timeline = dashboard
    ? buildEegTimeline(dashboard.scenes, maxTime)
    : null;
  const hasData =
    timeline &&
    (timeline.attention.points.length > 0 ||
      timeline.arousal.points.length > 0);

  return (
    <section
      style={{
        background: 'var(--surface)',
        borderRadius: 18,
        padding: 24,
        boxShadow: 'inset 0 0 0 1px var(--border2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          {DASHBOARD_COPY.eeg.title}
        </h3>
        <div style={{ display: 'flex', gap: 14, fontSize: 12 }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--text2)',
            }}
          >
            <span
              style={{
                width: 16,
                height: 3,
                background: 'var(--accent)',
                borderRadius: 2,
              }}
            />
            집중도
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--text2)',
            }}
          >
            <span
              style={{
                width: 16,
                height: 3,
                background: 'var(--warn)',
                borderRadius: 2,
              }}
            />
            각성도
          </span>
        </div>
      </div>

      {!hasData ? (
        <div
          style={{
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text4)',
            fontSize: 14,
          }}
        >
          {isPending
            ? '타임라인 불러오는 중…'
            : isError
              ? '타임라인을 불러오지 못했습니다.'
              : 'EEG 장면별 데이터가 없습니다.'}
        </div>
      ) : (
        timeline && (
          <svg
            width="100%"
            viewBox={`0 0 ${timeline.viewBoxWidth} 180`}
            style={{ display: 'block' }}
          >
            {timeline.peakHighlight && (
              <>
                <rect
                  x={timeline.peakHighlight.x}
                  y={14}
                  width={timeline.peakHighlight.width}
                  height={136}
                  fill="#3182f6"
                  opacity={0.08}
                  rx={3}
                />
                <text
                  x={timeline.peakHighlight.centerX}
                  y={28}
                  fontSize={10}
                  fill="#3182f6"
                  fontWeight={700}
                  textAnchor="middle"
                >
                  피크
                </text>
              </>
            )}

            <line
              x1={timeline.baselineX1}
              y1={timeline.baselineY}
              x2={timeline.baselineX2}
              y2={timeline.baselineY}
              stroke="#e5e8eb"
              strokeWidth={1}
            />

            {timeline.timeTicks.map((tick) => (
              <text
                key={tick.label}
                x={tick.x}
                y={168}
                textAnchor={
                  tick.anchor as 'start' | 'middle' | 'end' | undefined
                }
                fill="#8b95a1"
                fontSize={11}
              >
                {tick.label}
              </text>
            ))}

            {timeline.attention.path && (
              <path
                d={timeline.attention.path}
                stroke="#3182f6"
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {timeline.arousal.path && (
              <path
                d={timeline.arousal.path}
                stroke="#f59e0b"
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        )
      )}
    </section>
  );
};

export default EegTimelineCard;
