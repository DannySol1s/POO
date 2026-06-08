import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
    tag: "MODO BÁSICO",
    desc: "Pura teoría y código de 2 líneas. Hay pistas de compas si la riegas. Ideal para calentar motores antes de que compile de verdad.",
    chips: ["30 seg", "Pistas de compas", "Vidas infinitas"],
    color: "#10b981",
    art: "</>",
    lives: null,
    maxTime: 30,
  },
  {
    id: "normal",
    label: "Normal",
    tag: "MODO ESTÁNDAR",
    desc: "Mezcla justa de teoría y código. Sin acordeón, sin pistas, sin red de seguridad. El modo sin excusas para el estudiante promedio.",
    chips: ["30 seg", "Sin pistas", "Con dignidad"],
    color: "#6366f1",
    art: "{ }",
    lives: null,
    maxTime: 30,
  },
  {
    id: "heroico",
    label: "Heroico",
    tag: "MODO ÉLITE",
    desc: "Bloques de código con trampas de sintaxis y lógica densa. Tienes 3 vidas en el server — adminístralas bien o vas para atrás.",
    chips: ["30 seg", "3 Vidas", "Carrilla pesada"],
    color: "#f59e0b",
    art: "❤️",
    lives: 3,
    maxTime: 30,
  },
  {
    id: "legendario",
    label: "Legendario",
    tag: "MODO CRÍTICO",
    desc: "Muerte súbita. 15 segundos en el reloj por pregunta. Un solo punto y coma que te falte y todo se va al vacío. Sin piedad, solo para Seniors.",
    chips: ["15 seg", "Muerte Súbita", "Modo VRG"],
    color: "#f43f5e",
    art: "null",
    lives: 1,
    maxTime: 15,
  },
];

const topicItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

export default function Home({ onStart, onAuth, onRanking }) {
  const { user, logout } = useAuth();
  const [step, setStep]               = useState("topic");
  const [selectedTopic, setSelectedTopic] = useState("todos");
  const [selectedMode, setSelectedMode]   = useState("normal");
  const [counts, setCounts]               = useState({});
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState(null);

  const mode  = MODES.find((m) => m.id === selectedMode);
  const topic = TOPICS.find((t) => t.id === selectedTopic);

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
      setError("Se cayó el server o no levantaste la API en Hono. Dale un pop al back, carnal.");
      setLoading(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {step === "topic" ? (
        <motion.div
          key="topic"
          className="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {/* TOP ROW: brand (izquierda) + user bar (derecha en desktop) */}
          <motion.div
            className="home-top"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="home-brand">
              <motion.span
                className="home-logo"
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                &lt;/&gt;
              </motion.span>
              <div className="home-brand-text">
                <h1 className="home-title">POO CHALLENGE: TVRG</h1>
                <p className="home-subtitle">Demuestra tu lógica, supera las quests y ponte trucha con la POO... o catarreará tu código.</p>
              </div>
            </div>

            <motion.div
              className="home-user-bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {user ? (
                <>
                  <span className="user-greeting">Qué tranza, <strong>{user.username}</strong></span>
                  <div className="user-actions">
                    <button className="btn-link" onClick={onRanking}>
                      <TrophyIcon /> Ranking Global
                    </button>
                    <button className="btn-link btn-link--muted" onClick={logout}>Cerrar Sesión</button>
                  </div>
                </>
              ) : (
                <button className="btn btn--ghost btn--sm" onClick={onAuth}>
                  Forjar Identidad (Log In / Sign Up)
                </button>
              )}
            </motion.div>
          </motion.div>

          {/* BODY: temas (izquierda) + sidebar (derecha) */}
          <div className="home-body">
            <motion.section
              className="home-topics"
              variants={{ animate: { transition: { staggerChildren: 0.06 } } }}
              initial="initial"
              animate="animate"
            >
              <h2 className="section-label">Seleccionar Quest (Tema)</h2>
              <div className="topics-grid">
                {TOPICS.map((t) => (
                  <motion.button
                    key={t.id}
                    className={`topic-card ${selectedTopic === t.id ? "topic-card--active" : ""}`}
                    style={{ "--topic-color": t.color }}
                    onClick={() => setSelectedTopic(t.id)}
                    variants={topicItem}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1, scale: 0.98 }}
                  >
                    <span className="topic-icon"><TopicIcon id={t.id} size={28} /></span>
                    <span className="topic-label">{t.label}</span>
                    {counts[t.id] != null && (
                      <span className="topic-count">{counts[t.id]} misiones</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.section>

            <motion.aside
              className="home-sidebar"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              <div className="score-legend">
                <h2 className="section-label" style={{ marginBottom: 10 }}>Reglas del Backend (Botín)</h2>
                <div className="legend-item"><span className="legend-dot legend-dot--base"></span>100 pts por quest correcta</div>
                <div className="legend-item"><span className="legend-dot legend-dot--time"></span>+50 pts si respondes rápido</div>
                <div className="legend-item"><span className="legend-dot legend-dot--streak"></span>+10-50 pts por racha de aciertos</div>
                <div className="legend-item legend-item--max"><span className="legend-dot legend-dot--base"></span>Techo del sistema: <strong>1,900 pts</strong></div>
              </div>

              <motion.button
                className="btn btn--cta btn--lg"
                onClick={() => setStep("mode")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Darle Con Todo →
              </motion.button>
            </motion.aside>
          </div>
        </motion.div>

      ) : (
        <motion.div
          key="mode"
          className="modeselect"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="modeselect-header">
            <button className="modeselect-back" onClick={() => setStep("topic")}>
              ← Volver
            </button>
            <div className="modeselect-title-wrap">
              <p className="modeselect-subtitle">Tema: <strong style={{ color: topic.color }}>{topic.label}</strong></p>
              <h1 className="modeselect-title">ELEGIR DIFICULTAD</h1>
            </div>
          </div>

          {/* Body: sidebar + preview */}
          <div className="modeselect-body">
            {/* Sidebar — lista de modos */}
            <nav className="modeselect-list">
              {MODES.map((m) => (
                <motion.button
                  key={m.id}
                  className={`modeselect-item ${selectedMode === m.id ? "modeselect-item--active" : ""}`}
                  style={{ "--mode-color": m.color }}
                  onClick={() => setSelectedMode(m.id)}
                  whileTap={{ scale: 0.97 }}
                >
                  {m.label}
                </motion.button>
              ))}
            </nav>

            {/* Preview panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMode}
                className="modeselect-preview"
                style={{ "--mode-color": mode.color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Decorative scan lines + corner frame via CSS */}
                <motion.div
                  className="modeselect-art"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="modeselect-art-glyph">{mode.art}</span>
                </motion.div>

                <div className="modeselect-info">
                  <p className="modeselect-tag">{mode.tag}</p>
                  <h2 className="modeselect-name">{mode.label}</h2>
                  <p className="modeselect-desc">{mode.desc}</p>
                  <div className="modeselect-chips">
                    {mode.chips.map((chip) => (
                      <span key={chip} className="modeselect-chip">{chip}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          {error && <p className="error-msg">{error}</p>}
          <motion.button
            className="btn btn--cta btn--lg modeselect-accept"
            onClick={handleStart}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? "Cargando..." : "⚡ INICIAR MISIÓN"}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
