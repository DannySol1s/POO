import { Hono } from "hono";
import { challenges } from "../data/challenges.js";
import { rateLimit } from "../middleware/rateLimit.js";

export const challengesRouter = new Hono();

const checkLimiter = rateLimit({ max: 60, windowMs: 5 * 60 * 1000, message: "Demasiadas verificaciones. Espera un momento." });

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Versión pública de un desafío: opciones mezcladas como {text, key} (key = índice
// original en challenges.js) y sin correctIndex/explanation — el cliente no puede
// saber qué key es la correcta sin llamar a /check.
function toPublicChallenge(challenge) {
  const { correctIndex, explanation, options, ...rest } = challenge;
  const shuffledOptions = shuffle(options.map((text, key) => ({ text, key })));
  return { ...rest, options: shuffledOptions };
}

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

  const selected = shuffle(pool).slice(0, limit).map(toPublicChallenge);
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

// Valida la opción elegida (key = índice original en challenges.js) y revela
// la respuesta correcta + explicación. key inválido o ausente (timeout) → incorrecto.
challengesRouter.post("/:id/check", checkLimiter, async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json().catch(() => null);

  const challenge = challenges.find((ch) => ch.id === id);
  if (!challenge) {
    return c.json({ error: "Desafío no encontrado" }, 404);
  }

  const key = body?.key;
  const validKey = Number.isInteger(key) && key >= 0 && key < challenge.options.length;
  const correct = validKey && key === challenge.correctIndex;

  return c.json({
    correct,
    correctKey: challenge.correctIndex,
    explanation: challenge.explanation,
  });
});
