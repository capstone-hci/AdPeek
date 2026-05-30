/**
 * components/SummaryCard.tsx — 데이터 요약 사이드 카드.
 */
import { DASHBOARD_COPY } from '../constants/copy';
import type { DashboardResponse } from '../types/dashboard';
import { formatDisplayValue } from '../utils/dashboardFormat';
import SummaryAoiTable from './SummaryAoiTable';
import SummaryStatBox from './SummaryStatBox';

type SummaryCardProps = {
  dashboard?: DashboardResponse;
  isPending: boolean;
  isError: boolean;
};

const sectionLabelStyle = {
  fontSize: 11,
  color: 'var(--text3)',
  fontWeight: 700,
  letterSpacing: '0.06em',
  marginBottom: 14,
} as const;

const SummaryCard = ({ dashboard, isPending, isError }: SummaryCardProps) => {
  const insights = dashboard?.insights ?? null;

  return (
    <aside
      style={{
        background: 'var(--surface)',
        borderRadius: 18,
        padding: 24,
        boxShadow: 'inset 0 0 0 1px var(--border2)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: 24,
        }}
      >
        {DASHBOARD_COPY.summary.title}
      </h3>

      {isPending && (
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>불러오는 중…</div>
      )}

      {isError && !isPending && (
        <div style={{ fontSize: 13, color: 'var(--danger)' }}>
          데이터를 불러오지 못했습니다.
        </div>
      )}

      {insights && !isPending && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 32,
          }}
        >
          <div>
            <div style={sectionLabelStyle}>시선 추적</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                marginBottom: 14,
              }}
            >
              <SummaryStatBox
                label="주시 시간 최대 구간"
                value={formatDisplayValue(insights.gaze.maxGazeRange)}
              />
              <SummaryStatBox
                label="Dwell Time 최대"
                value={formatDisplayValue(insights.gaze.maxDwellTime)}
                color="var(--accent2)"
              />
            </div>
            <SummaryAoiTable rows={insights.gaze.aoiRows} />
          </div>

          <div>
            <div style={sectionLabelStyle}>뇌파 (EEG)</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <SummaryStatBox
                label="집중도 피크"
                value={formatDisplayValue(insights.eeg.attentionPeakRange)}
              />
              <SummaryStatBox
                label="각성도 피크"
                value={formatDisplayValue(insights.eeg.arousalPeakRange)}
                color="var(--warn)"
              />
            </div>
          </div>

          <div>
            <div style={sectionLabelStyle}>사후 설문</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 12,
              }}
            >
              <SummaryStatBox
                label="회상률"
                value={formatDisplayValue(insights.survey.recallRate)}
                color="var(--warn)"
              />
              <SummaryStatBox
                label="구매 의향"
                value={formatDisplayValue(insights.survey.purchaseIntent)}
              />
              <SummaryStatBox
                label="긍정 감정"
                value={formatDisplayValue(insights.survey.positiveEmotion)}
                color="var(--success)"
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SummaryCard;
