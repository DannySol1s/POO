import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext.jsx";

const RANK = [
  { min: 90, label: "Maestro POO",          emoji: "🏆", color: "#f59e0b" },
  { min: 70, label: "Desarrollador Senior", emoji: "🥇", color: "#4f46e5" },
  { min: 50, label: "En Progreso",           emoji: "🥈", color: "#10b981" },
  { min: 0,  label: "Sigue Practicando",     emoji: "📚", color: "#8b5cf6" },
];

function getRank(correct, total) {
  const pct = (correct / total) * 100;
  return RANK.find((r) => pct >= r.min);
}

const rowVariants = {
  initial: { opacity: 0, x: -16 },
  animate: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.05 + i * 0.04, duration: 0.25, ease: "easeOut" },
  }),
};

export default function Results({ result, config, onRestart, onRanking }) {
  const { user, token } = useAuth();
  const { score, answerHistory, topic } = result;
  const correct = answerHistory.filter((a) => a.correct).length;
  const total   = answerHistory.length;
  const rank    = getRank(correct, total);
  const pct     = Math.round((correct / total) * 100);

  const [saveStatus, setSaveStatus] = useState(null);
  const [displayScore, setDisplayScore] = useState(0);

  // Cuenta regresiva del score
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(score / 40);
    const interval = setInterval(() => {
      start = Math.min(start + step, score);
      setDisplayScore(start);
      if (start >= score) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [score]);

  // Guardar partida
  useEffect(() => {
    if (!user || !token) return;
    setSaveStatus("saving");
    fetch("/api/partidas", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ tema: topic, puntuacion: score, correctas: correct, total }),
    })
      .then((r) => setSaveStatus(r.ok ? "ok" : "error"))
      .catch(() => setSaveStatus("error"));
  }, []);

  return (
    <motion.div
      className="results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="results-hero"
        style={{ "--rank-color": rank.color }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="results-emoji"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 0.9, 1] }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {rank.emoji}
        </motion.div>
        <h1 className="results-rank">{rank.label}</h1>
        <div className="results-score">
          {displayScore.toLocaleString()} <span>puntos</span>
        </div>
        <div className="results-stats">
          <motion.div
            className="stat-pill stat-pill--correct"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
          >
            {correct}/{total} correctas
          </motion.div>
          <motion.div
            className="stat-pill stat-pill--pct"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
          >
            {pct}% precisión
          </motion.div>
        </div>

        {user && (
          <div className={`save-status save-status--${saveStatus}`}>
            {saveStatus === "saving" && "Guardando resultado..."}
            {saveStatus === "ok"     && "✓ Guardado en el ranking"}
            {saveStatus === "error"  && "No se pudo guardar"}
          </div>
        )}
        {!user && <p className="save-hint">Inicia sesión para guardar tu puntaje</p>}
      </motion.div>

      <section className="results-breakdown">
        <h2 className="section-label">Resumen de respuestas</h2>
        <div className="breakdown-list">
          {answerHistory.map((entry, i) => (
            <motion.div
              key={i}
              className={`breakdown-item ${entry.correct ? "breakdown-item--correct" : "breakdown-item--wrong"}`}
              custom={i}
              variants={rowVariants}
              initial="initial"
              animate="animate"
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
            </motion.div>
          ))}
        </div>
      </section>

      <div className="results-actions">
        <motion.button
          className="btn btn--cta btn--lg"
          onClick={() => onRestart(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97, y: 4 }}
        >
          ⚡ Repetir ({config?.topic === "todos" ? "todos" : config?.topic})
        </motion.button>
        <motion.button className="btn btn--ghost" onClick={onRanking}
          whileTap={{ scale: 0.97, y: 4 }}>
          🏆 Ver Ranking
        </motion.button>
        <motion.button className="btn btn--ghost" onClick={() => onRestart(false)}
          whileTap={{ scale: 0.97, y: 4 }}>
          Elegir otro tema
        </motion.button>
      </div>
    </motion.div>
  );
}
