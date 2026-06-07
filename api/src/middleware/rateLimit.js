const store = new Map();

// Limpieza periódica para evitar memory leaks
const cleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);
cleanup.unref?.();

/**
 * Middleware de rate limiting en memoria por IP + ruta.
 * Aceptable para un servidor persistente (Render).
 * Para serverless se necesitaría Redis/Upstash.
 */
export function rateLimit({
  max = 10,
  windowMs = 15 * 60 * 1000,
  message = "Demasiados intentos. Espera antes de continuar.",
} = {}) {
  return async (c, next) => {
    const ip =
      c.req.header("x-forwarded-for")?.split(",")[0].trim() ??
      c.req.header("x-real-ip") ??
      "unknown";

    const key  = `${c.req.path}:${ip}`;
    const now  = Date.now();
    const entry = store.get(key);

    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (entry.count >= max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      c.header("Retry-After", String(retryAfter));
      return c.json({ error: message }, 429);
    }

    entry.count++;
    return next();
  };
}
