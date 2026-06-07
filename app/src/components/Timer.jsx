export default function Timer({ timeLeft, maxTime, isAnswered, color }) {
  const pct = (timeLeft / maxTime) * 100;
  const isUrgent = timeLeft <= 10 && !isAnswered;

  return (
    <div className="timer">
      <div className="timer-bar-track">
        <div
          className={`timer-bar-fill ${isUrgent ? "timer-bar-fill--urgent" : ""}`}
          style={{
            width: `${pct}%`,
            backgroundColor: isUrgent ? "#ef4444" : color,
            transition: isAnswered ? "none" : "width 1s linear",
          }}
        />
      </div>
      <span className={`timer-label ${isUrgent ? "timer-label--urgent" : ""}`}>
        {timeLeft}s
      </span>
    </div>
  );
}
