import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      username      TEXT    UNIQUE NOT NULL COLLATE NOCASE,
      email         TEXT    UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT    NOT NULL,
      creado_en     TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS partidas (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id  INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      tema        TEXT    NOT NULL,
      puntuacion  INTEGER NOT NULL,
      correctas   INTEGER NOT NULL,
      total       INTEGER NOT NULL,
      dificultad  TEXT    NOT NULL DEFAULT 'normal',
      jugado_en   TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS partidas_arcade (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre     TEXT    NOT NULL,
      tema       TEXT    NOT NULL,
      puntuacion INTEGER NOT NULL,
      correctas  INTEGER NOT NULL,
      total      INTEGER NOT NULL,
      dificultad TEXT    NOT NULL DEFAULT 'normal',
      jugado_en  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);

  await db.execute("CREATE INDEX IF NOT EXISTS idx_partidas_puntuacion ON partidas(puntuacion DESC)");
  await db.execute("CREATE INDEX IF NOT EXISTS idx_partidas_usuario    ON partidas(usuario_id)");
  await db.execute("CREATE INDEX IF NOT EXISTS idx_partidas_tema       ON partidas(tema)");
  await db.execute("CREATE INDEX IF NOT EXISTS idx_arcade_puntuacion   ON partidas_arcade(puntuacion DESC)");
}

export async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!username || !password) {
    console.warn("[seed] ADMIN_USERNAME / ADMIN_PASSWORD no definidos — omitiendo seed de admin");
    return;
  }

  const { rows } = await db.execute({
    sql: "SELECT id FROM usuarios WHERE username = ?",
    args: [username],
  });
  if (rows.length > 0) return;

  const hash = await Bun.password.hash(password);
  await db.execute({
    sql: "INSERT INTO usuarios (username, email, password_hash) VALUES (?, ?, ?)",
    args: [username, `${username}@admin.local`, hash],
  });
  console.log(`[seed] Admin '${username}' creado.`);
}
