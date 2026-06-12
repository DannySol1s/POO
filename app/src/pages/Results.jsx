import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext.jsx";

const RANKS_GAME = [
  {
    min: 1500,
    label: "Domador de Excepciones",
    desc: "Ya te la sabes vrg. Las preguntas difíciles no te quitan el sueño — las lees, las procesas y las contestas. El compilador es tu aliado, no tu enemigo. Nivel respetable.",
    emoji: "🎯",
    color: "#f59e0b",
  },
  {
    min: 1000,
    label: "Puesto Trucha",
    desc: "Aquí ya no hay suerte. Llegaste porque entendiste lo suficiente pa' no adivinar. El código ya no te intimida — le entras, lo lees y lo resuelves. Buen nivel, carnal.",
    emoji: "🔒",
    color: "#6366f1",
  },
  {
    min: 600,
    label: 'El "En mi máquina sí funciona"',
    desc: "Sabes lo suficiente pa' armar algo que funcione... hasta que alguien más lo corre. El concepto lo tienes, pero hay huecos que solo salen cuando el código te enfrenta en frío. Cierra esos huecos.",
    emoji: "💻",
    color: "#3b82f6",
  },
  {
    min: 300,
    label: "Compilando en la Mente",
    desc: "Ya no necesitas correr el código pa' saber si truena — tu cerebro empieza a anticiparse. No siempre aciertas, pero ya razonas. Eso vale más de lo que crees.",
    emoji: "🧠",
    color: "#8b5cf6",
  },
  {
    min: 100,
    label: "Junior Despistado",
    desc: "Ya sabes algo. No mucho, pero algo. Los conceptos están en tu cabeza a medias y a veces hasta conectan solos. Con un poco más de práctica y menos copypaste, vas pa' arriba.",
    emoji: "☕",
    color: "#10b981",
  },
  {
    min: 0,
    label: "Copypaster de StackOverflow",
    desc: "No importa. Lo pegaste, corrió de milagro y rezaste pa' que nadie preguntara cómo funciona. El punto es que ya estás aquí — eso ya te pone un paso adelante del que ni lo intentó.",
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

export default function Results({ result, config, onRestart, onRanking, restarting }) {
  const { user, token } = useAuth();
  const { score, answerHistory, topic, difficulty = "normal", gameOver = false } = result;
  const correct = answerHistory.filter((a) => a.correct).length;
  const total   = answerHistory.length;
  const rank    = getRank(score);
  const pct     = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isPerfect = score === 1900;
  const isTopRank = rank?.label === "Domador de Excepciones";

  const [saveStatus, setSaveStatus]     = useState(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [arcadeName, setArcadeName]     = useState("");
  const [arcadeStatus, setArcadeStatus] = useState(null); // null | "saving" | "saved" | "no-record" | "error" | "skipped"
  const [arcadeResult, setArcadeResult] = useState(null); // { firstTime, newRecord, prevBest }

  const handleArcadeSave = useCallback(async () => {
    const nombre = arcadeName.trim();
    if (!nombre) return;
    setArcadeStatus("saving");
    try {
      const res = await fetch("/api/partidas/arcade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, tema: topic, puntuacion: score, correctas: correct, total, dificultad: difficulty }),
      });
      if (res.ok) {
        const data = await res.json();
        setArcadeResult(data);
        setArcadeStatus(data.newRecord ? "saved" : "no-record");
      } else {
        setArcadeStatus("error");
      }
    } catch {
      setArcadeStatus("error");
    }
  }, [arcadeName, topic, score, correct, total, difficulty]);

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
            Despliegue Fallido — Resultado Parcial
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
            COMPILACIÓN PERFECTA. 1,900/1,900. Eres el único ser en esta base de datos que alcanzó el techo real del sistema. El backend no puede rechazarte porque eres legítimo, vrg. ¡Vete por una coca, te la ganaste!
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
            Sigue farmeando experiencia para subir a Arquitecto del Polimorfismo en el Ranking.
          </motion.p>
        )}

        {user && (
          <div className={`save-status save-status--${saveStatus}`}>
            {saveStatus === "saving" && "Escribiendo en SQLite..."}
            {saveStatus === "ok"     && "✓ Guardado en el ranking global"}
            {saveStatus === "error"  && "❌ Explotó el commit, no se guardó."}
          </div>
        )}

        {!user && (
          <AnimatePresence mode="wait">
            {arcadeStatus === null && (
              <motion.div
                key="arcade-input"
                className="arcade-save"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, delay: 0.4 }}
              >
                <p className="arcade-save-label">🏆 ¿Dejar tu marca en el ranking?</p>
                <p className="arcade-save-hint">Mismo nombre = solo se guarda tu mejor score.</p>
                <div className="arcade-save-input-wrap">
                  <input
                    className="arcade-save-input"
                    type="text"
                    placeholder="AAA"
                    maxLength={5}
                    value={arcadeName}
                    onChange={(e) => {
                      const val = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, "")
                        .slice(0, 5);
                      setArcadeName(val);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleArcadeSave()}
                    autoComplete="off"
                    autoFocus
                  />
                  <span className={`arcade-name-counter ${arcadeName.length >= 5 ? "arcade-name-counter--max" : ""}`}>
                    {arcadeName.length}/5
                  </span>
                </div>
                <motion.button
                  className="btn btn--cta arcade-save-btn"
                  onClick={handleArcadeSave}
                  disabled={!arcadeName.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Dejar mi marca
                </motion.button>
                <button className="btn-link btn-link--muted" onClick={() => setArcadeStatus("skipped")}>
                  Ahora no
                </button>
              </motion.div>
            )}
            {arcadeStatus === "saving" && (
              <motion.p key="saving" className="arcade-status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Grabando en el servidor...
              </motion.p>
            )}
            {arcadeStatus === "saved" && (
              <motion.div key="saved" className="arcade-status arcade-status--ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                {arcadeResult?.firstTime
                  ? <p>✓ ¡<strong>{arcadeName}</strong> ya está en el ranking!</p>
                  : <p>✓ ¡Nuevo récord para <strong>{arcadeName}</strong>! Score actualizado.</p>
                }
              </motion.div>
            )}
            {arcadeStatus === "no-record" && (
              <motion.div key="no-record" className="arcade-status arcade-status--muted" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p>Tu récord anterior con <strong>{arcadeName}</strong> ({arcadeResult?.prevBest?.toLocaleString()} pts) sigue siendo mejor.</p>
                <p className="arcade-status-sub">¡Sigue intentando y vuelve a poner tu nombre si lo superas!</p>
              </motion.div>
            )}
            {arcadeStatus === "error" && (
              <motion.p key="error" className="arcade-status arcade-status--err" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                ❌ No se pudo guardar. Intenta de nuevo.
              </motion.p>
            )}
            {arcadeStatus === "skipped" && (
              <motion.p key="skipped" className="arcade-status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Score guardado solo en este dispositivo.
              </motion.p>
            )}
          </AnimatePresence>
        )}
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
                      Resp. correcta: {entry.challenge.options[entry.correctIndex]?.text}
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
          disabled={restarting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {restarting ? "Cargando..." : "⚡ Reintentar Quest"}
        </motion.button>
        <motion.button className="btn btn--ghost" onClick={onRanking}
          whileTap={{ scale: 0.97 }}>
          🏆 Ir al Tablero de Leyendas
        </motion.button>
        <motion.button className="btn btn--ghost" onClick={() => onRestart(false)}
          whileTap={{ scale: 0.97 }}>
          Cambiar de Misión
        </motion.button>
      </div>
    </motion.div>
  );
}
