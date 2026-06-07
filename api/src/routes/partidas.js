import { Hono } from "hono";
import db from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";

export const partidasRouter = new Hono();

const TEMAS_VALIDOS = ["todos", "clases", "objetos", "herencia", "polimorfismo", "encapsulamiento"];
// 10 preguntas × (100 base + 50 tiempo + 50 racha máx) = 2000 pts teórico
const MAX_PUNTUACION = 2000;

partidasRouter.post("/", requireAuth, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: "Cuerpo de solicitud inválido" }, 400);

  const { tema, puntuacion, correctas, total } = body;

  if (!TEMAS_VALIDOS.includes(tema)) {
    return c.json({ error: "Tema inválido" }, 400);
  }
  if (
    !Number.isInteger(puntuacion) || puntuacion < 0 || puntuacion > MAX_PUNTUACION ||
    !Number.isInteger(correctas) || correctas < 0 ||
    !Number.isInteger(total)     || total < 1 || total > 20 ||
    correctas > total
  ) {
    return c.json({ error: "Datos de partida inválidos" }, 400);
  }

  db.prepare(
    "INSERT INTO partidas (usuario_id, tema, puntuacion, correctas, total) VALUES (?, ?, ?, ?, ?)"
  ).run(user.sub, tema, puntuacion, correctas, total);

  return c.json({ ok: true }, 201);
});

// Mejor puntuación por usuario (global o por tema)
partidasRouter.get("/ranking", (c) => {
  const { tema, limit = "10" } = c.req.query();
  const lim = Math.min(Math.max(parseInt(limit) || 10, 1), 50);
  const filtrarTema = tema && tema !== "todos";

  const query = filtrarTema
    ? `SELECT u.username,
              MAX(p.puntuacion)                                      AS mejor_puntuacion,
              COUNT(*)                                               AS partidas,
              ROUND(CAST(SUM(p.correctas) AS REAL) / SUM(p.total) * 100, 1) AS precision_pct,
              p.tema
         FROM partidas p
         JOIN usuarios u ON u.id = p.usuario_id
        WHERE p.tema = ?
        GROUP BY p.usuario_id
        ORDER BY mejor_puntuacion DESC
        LIMIT ?`
    : `SELECT u.username,
              MAX(p.puntuacion)                                      AS mejor_puntuacion,
              COUNT(*)                                               AS partidas,
              ROUND(CAST(SUM(p.correctas) AS REAL) / SUM(p.total) * 100, 1) AS precision_pct,
              'todos'                                                AS tema
         FROM partidas p
         JOIN usuarios u ON u.id = p.usuario_id
        GROUP BY p.usuario_id
        ORDER BY mejor_puntuacion DESC
        LIMIT ?`;

  const rows = filtrarTema
    ? db.prepare(query).all(tema, lim)
    : db.prepare(query).all(lim);

  return c.json({ data: rows });
});

// Historial del usuario autenticado
partidasRouter.get("/mis-partidas", requireAuth, (c) => {
  const user = c.get("user");

  const rows = db.prepare(
    `SELECT tema, puntuacion, correctas, total, jugado_en
       FROM partidas
      WHERE usuario_id = ?
      ORDER BY jugado_en DESC
      LIMIT 20`
  ).all(user.sub);

  return c.json({ data: rows });
});
