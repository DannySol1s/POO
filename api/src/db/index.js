import { Database } from "bun:sqlite";
import { join } from "path";

const db = new Database(join(import.meta.dir, "../../../game.db"), { create: true });

db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    UNIQUE NOT NULL COLLATE NOCASE,
    email         TEXT    UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT    NOT NULL,
    creado_en     TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS partidas (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id  INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tema        TEXT    NOT NULL,
    puntuacion  INTEGER NOT NULL,
    correctas   INTEGER NOT NULL,
    total       INTEGER NOT NULL,
    jugado_en   TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

// Migración idempotente: agrega columna dificultad si no existe
try {
  db.exec("ALTER TABLE partidas ADD COLUMN dificultad TEXT NOT NULL DEFAULT 'normal'");
} catch {
  // La columna ya existe — no hacer nada
}

db.exec("CREATE INDEX IF NOT EXISTS idx_partidas_puntuacion ON partidas(puntuacion DESC)");
db.exec("CREATE INDEX IF NOT EXISTS idx_partidas_usuario    ON partidas(usuario_id)");
db.exec("CREATE INDEX IF NOT EXISTS idx_partidas_tema       ON partidas(tema)");

db.exec(`
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

db.exec("CREATE INDEX IF NOT EXISTS idx_arcade_puntuacion ON partidas_arcade(puntuacion DESC)");

export default db;

// Crea el usuario admin desde variables de entorno si no existe
export async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!username || !password) {
    console.warn("[seed] ADMIN_USERNAME / ADMIN_PASSWORD no definidos — omitiendo seed de admin");
    return;
  }

  const exists = db.prepare("SELECT id FROM usuarios WHERE username = ?").get(username);
  if (exists) return;

  const hash = await Bun.password.hash(password);
  db.prepare("INSERT INTO usuarios (username, email, password_hash) VALUES (?, ?, ?)")
    .run(username, `${username}@admin.local`, hash);
  console.log(`[seed] Admin '${username}' creado.`);
}
