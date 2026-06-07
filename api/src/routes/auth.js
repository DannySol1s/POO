import { Hono } from "hono";
import { sign } from "hono/jwt";
import db from "../db/index.js";
import { JWT_SECRET } from "../middleware/auth.js";

export const authRouter = new Hono();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
const JWT_TTL = 60 * 60 * 24; // 24 horas

function makeToken(id, username) {
  return sign(
    { sub: id, username, exp: Math.floor(Date.now() / 1000) + JWT_TTL },
    JWT_SECRET
  );
}

authRouter.post("/registro", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: "Cuerpo de solicitud inválido" }, 400);

  const { username, email, password } = body;

  if (!username || !email || !password) {
    return c.json({ error: "Todos los campos son obligatorios" }, 400);
  }
  if (!USERNAME_RE.test(username)) {
    return c.json({ error: "El usuario debe tener 3-20 caracteres alfanuméricos o guiones bajos" }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return c.json({ error: "El formato del correo no es válido" }, 400);
  }
  if (password.length < 8) {
    return c.json({ error: "La contraseña debe tener al menos 8 caracteres" }, 400);
  }

  const passwordHash = await Bun.password.hash(password);

  try {
    const result = db
      .prepare("INSERT INTO usuarios (username, email, password_hash) VALUES (?, ?, ?)")
      .run(username, email, passwordHash);

    const token = await makeToken(result.lastInsertRowid, username);
    return c.json({ token, username }, 201);
  } catch (e) {
    if (e.message.includes("UNIQUE")) {
      return c.json({ error: "El usuario o correo ya está registrado" }, 409);
    }
    throw e;
  }
});

authRouter.post("/login", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: "Cuerpo de solicitud inválido" }, 400);

  const { email, password } = body;

  if (!email || !password) {
    return c.json({ error: "Correo y contraseña son obligatorios" }, 400);
  }

  const user = db
    .prepare("SELECT id, username, password_hash FROM usuarios WHERE email = ?")
    .get(email);

  if (!user) {
    return c.json({ error: "Credenciales incorrectas" }, 401);
  }

  const valid = await Bun.password.verify(password, user.password_hash);
  if (!valid) {
    return c.json({ error: "Credenciales incorrectas" }, 401);
  }

  const token = await makeToken(user.id, user.username);
  return c.json({ token, username: user.username });
});
