const RANK = [
  { min: 90, label: "Maestro POO", emoji: "🏆", color: "#f59e0b" },
  { min: 70, label: "Desarrollador Senior", emoji: "🥇", color: "#6366f1" },
  { min: 50, label: "En Progreso", emoji: "🥈", color: "#10b981" },
  { min: 0, label: "Sigue Practicando", emoji: "📚", color: "#8b5cf6" },
];

function getRank(correct, total) {
  const pct = (correct / total) * 100;
  return RANK.find((r) => pct >= r.min);
}

export default function Results({ result, config, onRestart }) {
  const { score, answerHistory, topic } = result;
  const correct = answerHistory.filter((a) => a.correct).length;
  const total = answerHistory.length;
  const rank = getRank(correct, total);
  const maxScore = total * (100 + 50 + 50);
  const pct = Math.round((correct / total) * 100);

  return (
    <div className="results">
      <div className="results-hero" style={{ "--rank-color": rank.color }}>
        <div className="results-emoji">{rank.emoji}</div>
        <h1 className="results-rank">{rank.label}</h1>
        <div className="results-score">{score} <span>puntos</span></div>
        <div className="results-stats">
          <div className="stat-pill stat-pill--correct">{correct}/{total} correctas</div>
          <div className="stat-pill stat-pill--pct">{pct}% precisión</div>
        </div>
      </div>

      <section className="results-breakdown">
        <h2 className="section-label">Resumen de respuestas</h2>
        <div className="breakdown-list">
          {answerHistory.map((entry, i) => (
            <div
              key={i}
              className={`breakdown-item ${entry.correct ? "breakdown-item--correct" : "breakdown-item--wrong"}`}
            >
              <div className="breakdown-num">{i + 1}</div>
              <div className="breakdown-content">
                <p className="breakdown-question">{entry.challenge.question}</p>
                <div className="breakdown-meta">
                  <span className={`breakdown-badge ${entry.correct ? "breakdown-badge--correct" : "breakdown-badge--wrong"}`}>
                    {entry.correct ? `+${entry.points} pts` : "0 pts"}
                  </span>
                  <span className="breakdown-topic">{entry.challenge.topic}</span>
                  {!entry.correct && (
                    <span className="breakdown-answer">
                      Resp. correcta: {entry.challenge.options[entry.challenge.correctIndex]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="results-actions">
        <button className="btn btn--primary btn--lg" onClick={() => onRestart(true)}>
          Repetir ({config?.topic === "todos" ? "todos" : config?.topic})
        </button>
        <button className="btn btn--ghost" onClick={() => onRestart(false)}>
          Elegir otro tema
        </button>
      </div>
    </div>
  );
}
