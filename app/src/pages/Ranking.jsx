import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext.jsx";

const TEMAS = [
  { id: "todos",           label: "Global",          icon: "🎯" },
  { id: "clases",          label: "Clases",          icon: "🏛️" },
  { id: "objetos",         label: "Objetos",         icon: "📦" },
  { id: "herencia",        label: "Herencia",        icon: "🧬" },
  { id: "polimorfismo",    label: "Polimorfismo",    icon: "🔀" },
  { id: "encapsulamiento", label: "Encapsulamiento", icon: "🔒" },
];

const MEDALLAS = ["🥇", "🥈", "🥉"];

const rowVariants = {
  initial: { opacity: 0, x: 20 },
  animate: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: "easeOut" },
  }),
};

export default function Ranking({ onBack }) {
  const { user } = useAuth();
  const [tema, setTema]       = useState("todos");
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/partidas/ranking?tema=${tema}&limit=10`)
      .then((r) => r.json())
      .then((json) => setRows(json.data ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [tema]);

  return (
    <motion.div
      className="ranking"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="ranking-header">
        <button className="auth-back" onClick={onBack}>← Volver</button>
        <h1 className="ranking-title">🏆 Ranking</h1>
      </div>

      <div className="ranking-tabs">
        {TEMAS.map((t) => (
          <button
            key={t.id}
            className={`ranking-tab ${tema === t.id ? "ranking-tab--active" : ""}`}
            onClick={() => setTema(t.id)}
          >
            <span>{t.icon}</span>
            <span className="ranking-tab-label">{t.label}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <motion.div
          className="ranking-empty"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Cargando...
        </motion.div>
      ) : rows.length === 0 ? (
        <div className="ranking-empty">
          <p>Aún no hay partidas registradas</p>
          <p className="ranking-empty-sub">¡Sé el primero en jugar!</p>
        </div>
      ) : (
        <div className="ranking-table">
          <div className="ranking-row ranking-row--header">
            <span>#</span>
            <span>Jugador</span>
            <span>Mejor puntaje</span>
            <span>Precisión</span>
            <span>Partidas</span>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={`${row.username}-${i}`}
              className={`ranking-row ${user?.username === row.username ? "ranking-row--me" : ""}`}
              custom={i}
              variants={rowVariants}
              initial="initial"
              animate="animate"
            >
              <span className="ranking-pos">
                {i < 3 ? MEDALLAS[i] : i + 1}
              </span>
              <span className="ranking-username">
                {row.username}
                {user?.username === row.username && (
                  <span className="ranking-you"> (tú)</span>
                )}
              </span>
              <span className="ranking-score">{row.mejor_puntuacion.toLocaleString()}</span>
              <span className="ranking-pct">{row.precision_pct}%</span>
              <span className="ranking-games">{row.partidas}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
