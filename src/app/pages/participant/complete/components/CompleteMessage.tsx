/**
 * components/CompleteMessage.tsx — 완료 제목·설명 문구.
 */
import { COMPLETE_COPY } from '../constants/copy';

const CompleteMessage = () => (
  <>
    <h2
      style={{
        color: '#fff',
        fontSize: 26,
        fontWeight: 700,
        marginBottom: 10,
      }}
    >
      {COMPLETE_COPY.title}
    </h2>

    <p
      style={{
        color: 'rgb(153, 153, 153)',
        fontSize: 14,
        lineHeight: 1.7,
        marginBottom: 28,
      }}
    >
      {COMPLETE_COPY.description.map((line, index) => (
        <span key={line}>
          {line}
          {index < COMPLETE_COPY.description.length - 1 && <br />}
        </span>
      ))}
    </p>
  </>
);

export default CompleteMessage;
