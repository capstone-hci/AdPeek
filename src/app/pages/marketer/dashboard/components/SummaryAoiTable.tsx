import type { AoiRow } from '../types/dashboard';

type SummaryAoiTableProps = {
  rows: AoiRow[];
};

const SummaryAoiTable = ({ rows }: SummaryAoiTableProps) => {
  if (rows.length === 0) {
    return (
      <div
        style={{
          background: 'var(--bg2)',
          borderRadius: 10,
          padding: '14px 16px',
          fontSize: 13,
          color: 'var(--text3)',
        }}
      >
        AOI 데이터가 없습니다.
      </div>
    );
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
      <thead>
        <tr style={{ background: 'var(--bg2)' }}>
          <th
            style={{
              padding: '8px 12px',
              textAlign: 'left',
              color: 'var(--accent)',
              fontWeight: 700,
              borderRadius: '8px 0 0 8px',
            }}
          >
            AOI 영역
          </th>
          <th
            style={{
              padding: '8px 12px',
              textAlign: 'right',
              color: 'var(--text3)',
              fontWeight: 600,
            }}
          >
            Dwell
          </th>
          <th
            style={{
              padding: '8px 12px',
              textAlign: 'right',
              color: 'var(--text3)',
              fontWeight: 600,
              borderRadius: '0 8px 8px 0',
            }}
          >
            주시 횟수
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.area}
            style={{ borderBottom: '1px solid var(--border2)' }}
          >
            <td style={{ padding: '10px 12px', fontWeight: 600 }}>
              {row.area}
            </td>
            <td
              style={{
                padding: '10px 12px',
                textAlign: 'right',
                color: 'var(--text2)',
              }}
            >
              {row.dwell}
            </td>
            <td
              style={{
                padding: '10px 12px',
                textAlign: 'right',
                color: 'var(--text2)',
              }}
            >
              {row.count}회
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryAoiTable;
