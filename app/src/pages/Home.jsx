import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext.jsx";

const TopicIcon = ({ id, size = 28 }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (id === "todos") return (
    <svg {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  );
  if (id === "clases") return (
    <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
  );
  if (id === "objetos") return (
    <svg {...props}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
  );
  if (id === "herencia") return (
    <svg {...props}><circle cx="12" cy="5" r="2"/><path d="M12 7v5M7 12h10"/><circle cx="7" cy="14" r="2"/><circle cx="17" cy="14" r="2"/><path d="M7 16v2M17 16v2"/></svg>
  );
  if (id === "polimorfismo") return (
    <svg {...props}><rect x="2" y="3" width="7" height="7" rx="1"/><circle cx="17.5" cy="6.5" r="3.5"/><rect x="2" y="14" width="7" height="7" rx="3"/><path d="M14 17h6M17 14v6"/></svg>
  );
  if (id === "encapsulamiento") return (
    <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  );
  return null;
};

const TrophyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

const TOPICS = [
  { id: "todos",           label: "Todos",           color: "#6366f1" },
  { id: "clases",          label: "Clases",           color: "#3b82f6" },
  { id: "objetos",         label: "Objetos",          color: "#f59e0b" },
  { id: "herencia",        label: "Herencia",         color: "#10b981" },
  { id: "polimorfismo",    label: "Polimorfismo",     color: "#8b5cf6" },
  { id: "encapsulamiento", label: "Encapsulamiento",  color: "#f43f5e" },
];

const MODES = [
  {
    id: "facil",
    label: "Fácil",
    desc: "Solo teoría y código de 2 líneas. Pistas incluidas al fallar.",
    chips: ["30 seg", "Pistas"],
    color: "#10b981",
    lives: null,
    maxTime: 30,
  },
  {
    id: "normal",
    label: "Normal",
    desc: "Mezcla de teoría y código. El modo estándar, sin excusas.",
    chips: ["30 seg", "Sin pistas"],
    color: "#6366f1",
    lives: null,
    maxTime: 30,
  },
  {
    id: "heroico",
    label: "Heroico",
    desc: "Código con trampas. Tienes 3 vidas — úsalas bien.",
    chips: ["30 seg", "3 vidas"],
    color: "#f59e0b",
    lives: 3,
    maxTime: 30,
  },
  {
    id: "legendario",
    label: "Legendario",
    desc: "Muerte súbita. 15 segundos. Un error y todo se acaba.",
    chips: ["15 seg", "Muerte súbita"],
    color: "#f43f5e",
    lives: 1,
    maxTime: 15,
  },
];

const container = { animate: { transition: { staggerChildren: 0.06 } } };
const item = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

export default function Home({ onStart, onAuth, onRanking }) {
  const { user, logout } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState("todos");
  const [selectedMode, setSelectedMode]   = useState("normal");
  const [counts, setCounts]               = useState({});
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState(null);

  const mode = MODES.find((m) => m.id === selectedMode);

  useEffect(() => {
    fetch("/api/challenges/topics")
      .then((r) => r.json())
      .then((res) => {
        const map = {};
        res.data.forEach((t) => (map[t.id] = t.count));
        setCounts(map);
      })
      .catch(() => {});
  }, []);

  async function handleStart() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/challenges/random?topic=${selectedTopic}&difficulty=${selectedMode}&count=10`
      );
      const json = await res.json();
      if (!json.data?.length) throw new Error();
      onStart({
        topic: selectedTopic,
        difficulty: selectedMode,
        challenges: json.data,
        lives: mode.lives,
        maxTime: mode.maxTime,
      });
    } catch {
      setError("No se pudo cargar el desafío. ¿Está corriendo la API?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.header
        className="home-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="home-logo"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          &lt;/&gt;
        </motion.div>
        <h1 className="home-title">POO CHALLENGE</h1>
        <p className="home-subtitle">Pon a prueba tus conocimientos de<br />Programación Orientada a Objetos</p>
      </motion.header>

      <motion.div
        className="home-user-bar"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {user ? (
          <>
            <span className="user-greeting">Hola, <strong>{user.username}</strong></span>
            <div className="user-actions">
              <button className="btn-link" onClick={onRanking}>
                <TrophyIcon /> Ranking
              </button>
              <button className="btn-link btn-link--muted" onClick={logout}>Salir</button>
            </div>
          </>
        ) : (
          <button className="btn btn--ghost btn--sm" onClick={onAuth}>
            Iniciar sesión / Registrarse
          </button>
        )}
      </motion.div>

      <motion.section variants={container} initial="initial" animate="animate">
        <h2 className="section-label">Elegir tema</h2>
        <div className="topics-grid">
          {TOPICS.map((topic) => (
            <motion.button
              key={topic.id}
              className={`topic-card ${selectedTopic === topic.id ? "topic-card--active" : ""}`}
              style={{ "--topic-color": topic.color }}
              onClick={() => setSelectedTopic(topic.id)}
              variants={item}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1, scale: 0.98 }}
            >
              <span className="topic-icon">
                <TopicIcon id={topic.id} size={28} />
              </span>
              <span className="topic-label">{topic.label}</span>
              {counts[topic.id] != null && (
                <span className="topic-count">{counts[topic.id]} retos</span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <h2 className="section-label">Modo de juego</h2>
        <div className="modes-grid">
          {MODES.map((m) => (
            <motion.button
              key={m.id}
              className={`mode-card ${selectedMode === m.id ? "mode-card--active" : ""}`}
              style={{ "--mode-color": m.color }}
              onClick={() => setSelectedMode(m.id)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1, scale: 0.98 }}
            >
              <span className="mode-label">{m.label}</span>
              <span className="mode-desc">{m.desc}</span>
              <div className="mode-chips">
                {m.chips.map((chip) => (
                  <span key={chip} className="mode-chip">{chip}</span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {error && <p className="error-msg">{error}</p>}

      <motion.button
        className="btn btn--cta btn--lg"
        onClick={handleStart}
        disabled={loading}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {loading ? "Cargando..." : "⚡ Comenzar desafío"}
      </motion.button>

      <motion.div
        className="score-legend"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.3 }}
      >
        <h2 className="section-label" style={{ marginBottom: 8 }}>Sistema de puntuación</h2>
        <div className="legend-item"><span className="legend-dot legend-dot--base"></span>100 pts por respuesta correcta</div>
        <div className="legend-item"><span className="legend-dot legend-dot--time"></span>+50 bonus por velocidad</div>
        <div className="legend-item"><span className="legend-dot legend-dot--streak"></span>+10~50 pts por racha consecutiva</div>
        <div className="legend-item"><span className="legend-dot legend-dot--base"></span>Máximo posible: 1,900 pts</div>
      </motion.div>
    </motion.div>
  );
}
