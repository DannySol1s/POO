import { Hono } from "hono";
import { challenges } from "../data/challenges.js";

export const challengesRouter = new Hono();

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomizeOptions(challenge) {
  const correctAnswer = challenge.options[challenge.correctIndex];
  const shuffledOptions = shuffle(challenge.options);
  return {
    ...challenge,
    options: shuffledOptions,
    correctIndex: shuffledOptions.indexOf(correctAnswer),
  };
}

challengesRouter.get("/", (c) => {
  const { topic, difficulty } = c.req.query();
  let result = challenges;

  if (topic && topic !== "todos") {
    result = result.filter((ch) => ch.topic === topic);
  }
  if (difficulty) {
    result = result.filter((ch) => ch.difficulty === difficulty);
  }

  return c.json({ data: result, total: result.length });
});

// Modos de juego → dificultades de pregunta que incluyen
const DIFFICULTY_MAP = {
  facil:      ["facil"],
  normal:     ["facil", "medio"],
  heroico:    ["medio", "dificil"],
  legendario: ["dificil"],
};

challengesRouter.get("/random", (c) => {
  const { topic, count = "10", difficulty } = c.req.query();
  const limit = Math.min(parseInt(count, 10) || 10, 20);

  const allowedDifficulties = DIFFICULTY_MAP[difficulty] ?? null;

  let pool = challenges;

  if (allowedDifficulties) {
    pool = pool.filter((ch) => allowedDifficulties.includes(ch.difficulty));
  }

  if (topic && topic !== "todos") {
    pool = pool.filter((ch) => ch.topic === topic);
  } else if (!topic || topic === "todos") {
    const topics = ["clases", "objetos", "herencia", "polimorfismo", "encapsulamiento"];
    const perTopic = Math.ceil(limit / topics.length);
    pool = topics.flatMap((t) =>
      shuffle(pool.filter((ch) => ch.topic === t)).slice(0, perTopic)
    );
  }

  const selected = shuffle(pool).slice(0, limit).map(randomizeOptions);
  return c.json({ data: selected, total: selected.length });
});

challengesRouter.get("/topics", (c) => {
  const topics = [
    { id: "todos", label: "Todos los temas", color: "#0ea5e9", icon: "🎯", count: challenges.length },
    { id: "clases", label: "Clases", color: "#6366f1", icon: "🏛️", count: challenges.filter((c) => c.topic === "clases").length },
    { id: "objetos", label: "Objetos", color: "#f59e0b", icon: "📦", count: challenges.filter((c) => c.topic === "objetos").length },
    { id: "herencia", label: "Herencia", color: "#10b981", icon: "🧬", count: challenges.filter((c) => c.topic === "herencia").length },
    { id: "polimorfismo", label: "Polimorfismo", color: "#8b5cf6", icon: "🔀", count: challenges.filter((c) => c.topic === "polimorfismo").length },
    { id: "encapsulamiento", label: "Encapsulamiento", color: "#f43f5e", icon: "🔒", count: challenges.filter((c) => c.topic === "encapsulamiento").length },
  ];
  return c.json({ data: topics });
});

challengesRouter.post("/:id/check", async (c) => {
  const { id } = c.req.param();
  const { answer } = await c.req.json();

  const challenge = challenges.find((ch) => ch.id === id);
  if (!challenge) {
    return c.json({ error: "Desafío no encontrado" }, 404);
  }

  const correct = answer === challenge.correctIndex;
  return c.json({
    correct,
    correctIndex: challenge.correctIndex,
    explanation: challenge.explanation,
  });
});
