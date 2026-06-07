import { verify } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET no está definido en .env — el servidor no puede arrancar de forma segura.");
  process.exit(1);
}

export async function requireAuth(c, next) {
  const header = c.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) {
    return c.json({ error: "No autorizado" }, 401);
  }

  const token = header.slice(7);
  try {
    const payload = await verify(token, JWT_SECRET);
    c.set("user", payload);
    await next();
  } catch {
    return c.json({ error: "Token inválido o expirado" }, 401);
  }
}

export { JWT_SECRET };
