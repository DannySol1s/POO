import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext.jsx";

const RANKS_GAME = [
  {
    min: 1500,
    label: "Domador de Excepciones",
    desc: "Ya no le temes al 'NullPointerException' ni a los crashes inesperados. Los capturas todos con bloques try-catch impecables como si fueras un maestro Pokémon del código.",
    emoji: "🎯",
    color: "#f59e0b",
  },
  {
    min: 1000,
    label: "Puesto Trucha",
    desc: "Nivel intermedio real. Dominas el encapsulamiento a la perfección, sabes cuándo ocultar atributos con 'private' y tus diagramas de clases ya tienen coherencia y sentido.",
    emoji: "🔒",
    color: "#6366f1",
  },
  {
    min: 600,
    label: 'El "En mi máquina sí funciona"',
    desc: "Clásico. Tu código corre perfecto localmente, pero cuando lo subes al servidor de evaluación todo explota, se quema y se cae a pedazos. Culpas al entorno en el 100% de los casos.",
    emoji: "💻",
    color: "#3b82f6",
  },
  {
    min: 300,
    label: "Compilando en la Mente",
    desc: "Ya no necesitas correr el programa para saber en qué línea te faltó el punto y coma. Tu cerebro procesa flujos de datos básicos antes de que lo haga la computadora.",
    emoji: "🧠",
    color: "#8b5cf6",
  },
  {
    min: 100,
    label: "Junior Despistado",
    desc: "Ya sabes declarar variables y meter algún IF, pero todavía crees que el café se convierte en código por arte de magia. Conceptos como punteros o memoria te dan amnesia selectiva.",
    emoji: "☕",
    color: "#10b981",
  },
  {
    min: 0,
    label: "Copypaster de StackOverflow",
    desc: "No sabes qué hace el código, pero si funciona, no le mueves. Tu mejor amigo es el Ctrl+C y Ctrl+V. Le rezas a deidades desconocidas para que no tire error el compilador.",
    emoji: "📋",
    color: "#64748b",
  },
];

function getRank(score) {
  return RANKS_GAME.find((r) => score >= r.min);
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
  const { score, answerHistory, topic, difficulty = "normal", gameOver = false } = result;
  const correct = answerHistory.filter((a) => a.correct).length;
  const total   = answerHistory.length;
  const rank    = getRank(score);
  const pct     = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isPerfect = score === 1900;
  const isTopRank = rank?.label === "Domador de Excepciones";

  const [saveStatus, setSaveStatus] = useState(null);
  const [displayScore, setDisplayScore] = useState(0);

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

  useEffect(() => {
    if (!user || !token) return;
    setSaveStatus("saving");
    fetch("/api/partidas", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        tema: topic,
        puntuacion: score,
        correctas: correct,
        total,
        dificultad: difficulty,
      }),
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
        style={{ "--rank-color": rank?.color ?? "#64748b" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {gameOver && (
          <motion.div
            className="results-gameover-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            Game Over — resultado parcial
          </motion.div>
        )}

        <motion.div
          className="results-emoji"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 0.9, 1] }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {rank?.emoji}
        </motion.div>
        <h1 className="results-rank">{rank?.label}</h1>
        <p className="results-rank-desc">{rank?.desc}</p>

        {isPerfect && (
          <motion.p
            className="results-perfect"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            COMPILACIÓN PERFECTA. 1,900/1,900. Eres el único ser en esta base de datos que alcanzó el techo real del sistema. El backend no puede rechazarte porque eres legítimo, vrg.
          </motion.p>
        )}

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

        {isTopRank && !isPerfect && (
          <motion.p
            className="results-teaser"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Sigue jugando para llegar a Arquitecto del Polimorfismo y más allá.
          </motion.p>
        )}

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
          whileTap={{ scale: 0.97 }}
        >
          ⚡ Repetir ({config?.topic === "todos" ? "todos" : config?.topic})
        </motion.button>
        <motion.button className="btn btn--ghost" onClick={onRanking}
          whileTap={{ scale: 0.97 }}>
          🏆 Ver Ranking
        </motion.button>
        <motion.button className="btn btn--ghost" onClick={() => onRestart(false)}
          whileTap={{ scale: 0.97 }}>
          Elegir otro tema
        </motion.button>
      </div>
    </motion.div>
  );
}
