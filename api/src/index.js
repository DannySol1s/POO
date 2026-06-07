import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { challengesRouter } from "./routes/challenges.js";
import { authRouter } from "./routes/auth.js";
import { partidasRouter } from "./routes/partidas.js";

// Orígenes permitidos: siempre localhost en dev + dominios de producción vía env
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:4173",
  ...(process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) ?? []),
];

const app = new Hono();

app.use("*", logger());
app.use("*", secureHeaders());
app.use(
  "*",
  cors({
    origin: ALLOWED_ORIGINS,
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (c) => c.json({ name: "POO Challenge API", version: "1.0.0" }));
app.route("/api/challenges", challengesRouter);
app.route("/api/auth", authRouter);
app.route("/api/partidas", partidasRouter);

app.notFound((c) => c.json({ error: "Ruta no encontrada" }, 404));

export default {
  port: 3000,
  fetch: app.fetch,
};
