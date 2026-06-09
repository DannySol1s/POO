import { Hono } from "hono";
import db from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";

export const partidasRouter = new Hono();

const arcadeLimiter = rateLimit({ max: 20, windowMs: 15 * 60 * 1000, message: "Demasiados registros. Espera un momento." });

const TEMAS_VALIDOS = ["todos", "clases", "objetos", "herencia", "polimorfismo", "encapsulamiento"];
const DIFICULTADES_VALIDAS = ["facil", "normal", "heroico", "legendario"];

// Puntaje máximo real por dificultad (base 1900 × multiplicador del modo)
const MAX_POR_DIFICULTAD = { facil: 1330, normal: 1900, heroico: 2660, legendario: 3800 };

function validarPartida(puntuacion, correctas, total, dificultad) {
  const max = MAX_POR_DIFICULTAD[dificultad] ?? 1900;
  return (
    Number.isInteger(puntuacion) && puntuacion >= 0 && puntuacion <= max &&
    Number.isInteger(correctas)  && correctas  >= 0 &&
    Number.isInteger(total)      && total >= 1 && total <= 20 &&
    correctas <= total
  );
}

partidasRouter.post("/", requireAuth, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: "Cuerpo de solicitud inválido" }, 400);

  const { tema, puntuacion, correctas, total, dificultad = "normal" } = body;

  if (!TEMAS_VALIDOS.includes(tema))        return c.json({ error: "Tema inválido" }, 400);
  if (!DIFICULTADES_VALIDAS.includes(dificultad)) return c.json({ error: "Dificultad inválida" }, 400);
  if (!validarPartida(puntuacion, correctas, total, dificultad)) {
    return c.json({ error: "Datos de partida inválidos" }, 400);
  }

  db.prepare(
    "INSERT INTO partidas (usuario_id, tema, puntuacion, correctas, total, dificultad) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(user.sub, tema, puntuacion, correctas, total, dificultad);

  return c.json({ ok: true }, 201);
});

// Guardar partida sin cuenta (estilo arcade)
partidasRouter.post("/arcade", arcadeLimiter, async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: "Cuerpo de solicitud inválido" }, 400);

  const { nombre, tema, puntuacion, correctas, total, dificultad = "normal" } = body;

  const nombreTrimmed = (nombre ?? "").trim().slice(0, 25);
  if (!nombreTrimmed) return c.json({ error: "Nombre requerido" }, 400);

  if (!TEMAS_VALIDOS.includes(tema))        return c.json({ error: "Tema inválido" }, 400);
  if (!DIFICULTADES_VALIDAS.includes(dificultad)) return c.json({ error: "Dificultad inválida" }, 400);
  if (!validarPartida(puntuacion, correctas, total, dificultad)) {
    return c.json({ error: "Datos de partida inválidos" }, 400);
  }

  db.prepare(
    "INSERT INTO partidas_arcade (nombre, tema, puntuacion, correctas, total, dificultad) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(nombreTrimmed, tema, puntuacion, correctas, total, dificultad);

  return c.json({ ok: true }, 201);
});

// Mejor puntuación + total acumulado (usuarios registrados + arcade)
partidasRouter.get("/ranking", (c) => {
  const { tema, limit = "10" } = c.req.query();
  const lim = Math.min(Math.max(parseInt(limit) || 10, 1), 50);
  const filtrarTema = tema && tema !== "todos";

  const query = filtrarTema
    ? `SELECT username,
              MAX(puntuacion)                                               AS mejor_puntuacion,
              SUM(puntuacion)                                               AS puntuacion_total,
              COUNT(*)                                                      AS partidas,
              ROUND(CAST(SUM(correctas) AS REAL) / SUM(total) * 100, 1)   AS precision_pct,
              ?                                                             AS tema
         FROM (
           SELECT u.username, p.puntuacion, p.correctas, p.total
             FROM partidas p JOIN usuarios u ON u.id = p.usuario_id
            WHERE p.tema = ?
           UNION ALL
           SELECT nombre, puntuacion, correctas, total
             FROM partidas_arcade WHERE tema = ?
         )
         GROUP BY username
         ORDER BY mejor_puntuacion DESC
         LIMIT ?`
    : `SELECT username,
              MAX(puntuacion)                                               AS mejor_puntuacion,
              SUM(puntuacion)                                               AS puntuacion_total,
              COUNT(*)                                                      AS partidas,
              ROUND(CAST(SUM(correctas) AS REAL) / SUM(total) * 100, 1)   AS precision_pct,
              'todos'                                                       AS tema
         FROM (
           SELECT u.username, p.puntuacion, p.correctas, p.total
             FROM partidas p JOIN usuarios u ON u.id = p.usuario_id
           UNION ALL
           SELECT nombre, puntuacion, correctas, total
             FROM partidas_arcade
         )
         GROUP BY username
         ORDER BY mejor_puntuacion DESC
         LIMIT ?`;

  const rows = filtrarTema
    ? db.prepare(query).all(tema, tema, tema, lim)
    : db.prepare(query).all(lim);

  return c.json({ data: rows });
});

// Historial del usuario autenticado
partidasRouter.get("/mis-partidas", requireAuth, (c) => {
  const user = c.get("user");

  const rows = db.prepare(
    `SELECT tema, dificultad, puntuacion, correctas, total, jugado_en
       FROM partidas
      WHERE usuario_id = ?
      ORDER BY jugado_en DESC
      LIMIT 20`
  ).all(user.sub);

  return c.json({ data: rows });
});
