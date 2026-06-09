import { Hono } from "hono";
import { sign } from "hono/jwt";
import db from "../db/index.js";
import { JWT_SECRET } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";

const authLimiter = rateLimit({ max: 10, windowMs: 15 * 60 * 1000 });

export const authRouter = new Hono();

const JWT_TTL = 60 * 60 * 24; // 24 horas

function makeToken(id, username) {
  return sign(
    { sub: id, username, exp: Math.floor(Date.now() / 1000) + JWT_TTL },
    JWT_SECRET
  );
}

authRouter.post("/login", authLimiter, async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: "Cuerpo de solicitud inválido" }, 400);

  const { username, password } = body;
  if (!username || !password) {
    return c.json({ error: "Usuario y contraseña son obligatorios" }, 400);
  }

  const user = db
    .prepare("SELECT id, username, password_hash FROM usuarios WHERE username = ?")
    .get(username);

  if (!user) return c.json({ error: "Credenciales incorrectas" }, 401);

  const valid = await Bun.password.verify(password, user.password_hash);
  if (!valid) return c.json({ error: "Credenciales incorrectas" }, 401);

  const token = await makeToken(user.id, user.username);
  return c.json({ token, username: user.username });
});
