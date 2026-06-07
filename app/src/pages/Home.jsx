import { useState, useEffect } from "react";

const TOPICS = [
  { id: "todos", label: "Todos los temas", color: "#0ea5e9", icon: "🎯" },
  { id: "clases", label: "Clases", color: "#6366f1", icon: "🏛️" },
  { id: "objetos", label: "Objetos", color: "#f59e0b", icon: "📦" },
  { id: "herencia", label: "Herencia", color: "#10b981", icon: "🧬" },
  { id: "polimorfismo", label: "Polimorfismo", color: "#8b5cf6", icon: "🔀" },
  { id: "encapsulamiento", label: "Encapsulamiento", color: "#f43f5e", icon: "🔒" },
];

export default function Home({ onStart }) {
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
      const url = `/api/challenges/random?topic=${selectedTopic}&count=10`;
      const res = await fetch(url);
      const json = await res.json();
      if (!json.data?.length) throw new Error("Sin preguntas disponibles");
      onStart({ topic: selectedTopic, challenges: json.data });
    } catch (e) {
      setError("No se pudo cargar el desafío. ¿Está corriendo la API?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-logo">&lt;/&gt;</div>
        <h1 className="home-title">POO Challenge</h1>
        <p className="home-subtitle">Pon a prueba tus conocimientos de<br />Programación Orientada a Objetos</p>
      </header>

      <section className="home-section">
        <h2 className="section-label">Elige un tema</h2>
        <div className="topics-grid">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              className={`topic-card ${selectedTopic === topic.id ? "topic-card--active" : ""}`}
              style={{ "--topic-color": topic.color }}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <span className="topic-icon">{topic.icon}</span>
              <span className="topic-label">{topic.label}</span>
              {counts[topic.id] != null && (
                <span className="topic-count">{counts[topic.id]} preguntas</span>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="home-info">
        <div className="info-chip">10 preguntas</div>
        <div className="info-chip">30 seg por pregunta</div>
        <div className="info-chip">JavaScript</div>
      </section>

      {error && <p className="error-msg">{error}</p>}

      <button
        className="btn btn--primary btn--lg"
        onClick={handleStart}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Empezar Desafío"}
      </button>

      <div className="score-legend">
        <div className="legend-item"><span className="legend-dot legend-dot--base"></span>100 por respuesta correcta</div>
        <div className="legend-item"><span className="legend-dot legend-dot--time"></span>+50 bonus por rapidez</div>
        <div className="legend-item"><span className="legend-dot legend-dot--streak"></span>+10 por racha consecutiva</div>
      </div>
    </div>
  );
}
