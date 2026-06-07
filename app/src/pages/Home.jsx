import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext.jsx";

const TOPICS = [
  { id: "todos",           label: "Todos los temas",  color: "#0ea5e9", icon: "🎯" },
  { id: "clases",          label: "Clases",            color: "#4f46e5", icon: "🏛️" },
  { id: "objetos",         label: "Objetos",           color: "#f59e0b", icon: "📦" },
  { id: "herencia",        label: "Herencia",          color: "#10b981", icon: "🧬" },
  { id: "polimorfismo",    label: "Polimorfismo",      color: "#8b5cf6", icon: "🔀" },
  { id: "encapsulamiento", label: "Encapsulamiento",   color: "#f43f5e", icon: "🔒" },
];

const container = {
  animate: { transition: { staggerChildren: 0.07 } },
};
const item = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Home({ onStart, onAuth, onRanking }) {
  const { user, logout } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState("todos");
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const res = await fetch(`/api/challenges/random?topic=${selectedTopic}&count=10`);
      const json = await res.json();
      if (!json.data?.length) throw new Error();
      onStart({ topic: selectedTopic, challenges: json.data });
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
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          &lt;/&gt;
        </motion.div>
        <h1 className="home-title">POO Challenge</h1>
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
              <button className="btn-link" onClick={onRanking}>🏆 Ranking</button>
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
        <h2 className="section-label">Elige un tema</h2>
        <div className="topics-grid">
          {TOPICS.map((topic) => (
            <motion.button
              key={topic.id}
              className={`topic-card ${selectedTopic === topic.id ? "topic-card--active" : ""}`}
              style={{ "--topic-color": topic.color }}
              onClick={() => setSelectedTopic(topic.id)}
              variants={item}
              whileHover={{ y: -3 }}
              whileTap={{ y: 2, scale: 0.98 }}
            >
              <span className="topic-icon">{topic.icon}</span>
              <span className="topic-label">{topic.label}</span>
              {counts[topic.id] != null && (
                <span className="topic-count">{counts[topic.id]} preguntas</span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="home-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div className="info-chip">10 preguntas</div>
        <div className="info-chip">30 seg por pregunta</div>
        <div className="info-chip">JavaScript</div>
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
        whileTap={{ scale: 0.97, y: 4 }}
      >
        {loading ? "Cargando..." : "⚡ Empezar Desafío"}
      </motion.button>

      <motion.div
        className="score-legend"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.3 }}
      >
        <div className="legend-item"><span className="legend-dot legend-dot--base"></span>100 por respuesta correcta</div>
        <div className="legend-item"><span className="legend-dot legend-dot--time"></span>+50 bonus por rapidez</div>
        <div className="legend-item"><span className="legend-dot legend-dot--streak"></span>+10 por racha consecutiva</div>
      </motion.div>
    </motion.div>
  );
}
