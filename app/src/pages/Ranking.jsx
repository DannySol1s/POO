import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext.jsx";

const TEMAS = [
  { id: "todos",           label: "Global"          },
  { id: "clases",          label: "Clases"          },
  { id: "objetos",         label: "Objetos"         },
  { id: "herencia",        label: "Herencia"        },
  { id: "polimorfismo",    label: "Polimorfismo"    },
  { id: "encapsulamiento", label: "Encapsulamiento" },
];

const MEDALLAS = ["🥇", "🥈", "🥉"];

const RANKS_CUMULATIVE = [
  { min: 4500, label: "Senior Master VRG",           emoji: "👑" },
  { min: 3600, label: "Hacker de Cybercafé",          emoji: "⚡" },
  { min: 2800, label: "Senior de Pasillo",            emoji: "🦾" },
  { min: 2100, label: "Arquitecto del Polimorfismo",  emoji: "🏗️" },
  { min: 1500, label: "Domador de Excepciones",       emoji: "🎯" },
  { min: 1000, label: "Puesto Trucha",                emoji: "🔒" },
  { min: 600,  label: 'En mi máquina sí funciona',    emoji: "💻" },
  { min: 300,  label: "Compilando en la Mente",       emoji: "🧠" },
  { min: 100,  label: "Junior Despistado",            emoji: "☕" },
  { min: 0,    label: "Copypaster de StackOverflow",  emoji: "📋" },
];

function getRankBadge(score) {
  return RANKS_CUMULATIVE.find((r) => score >= r.min) ?? RANKS_CUMULATIVE[RANKS_CUMULATIVE.length - 1];
}

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
          <p>Aún no hay registros en la DB.</p>
          <p className="ranking-empty-sub">Sé el primero en poner su nombre en el código.</p>
        </div>
      ) : (
        <div className="ranking-table">
          <div className="ranking-row ranking-row--header">
            <span>#</span>
            <span>Developer</span>
            <span>Rango de Barrio</span>
            <span>Máximo Botín</span>
            <span>Precisión de Compilación</span>
            <span>Quests Jugadas</span>
          </div>

          {rows.map((row, i) => {
            const badge = getRankBadge(row.puntuacion_total ?? row.mejor_puntuacion);
            return (
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
                <span className="ranking-badge" title={badge.label}>
                  <span className="ranking-badge-emoji">{badge.emoji}</span>
                  <span className="ranking-badge-label">{badge.label}</span>
                </span>
                <span className="ranking-score">{row.mejor_puntuacion.toLocaleString()}</span>
                <span className="ranking-pct">{row.precision_pct}%</span>
                <span className="ranking-games">{row.partidas}</span>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
