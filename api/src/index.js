import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { challengesRouter } from "./routes/challenges.js";
import { authRouter } from "./routes/auth.js";
import { partidasRouter } from "./routes/partidas.js";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
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
