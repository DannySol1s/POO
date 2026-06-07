export default function ProgressBar({ current, total, color }) {
  const pct = (current / total) * 100;

  return (
    <div className="progress">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="progress-label">
        {current} / {total}
      </span>
    </div>
  );
}
