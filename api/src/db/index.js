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

db.exec("CREATE INDEX IF NOT EXISTS idx_partidas_puntuacion ON partidas(puntuacion DESC)");
db.exec("CREATE INDEX IF NOT EXISTS idx_partidas_usuario    ON partidas(usuario_id)");
db.exec("CREATE INDEX IF NOT EXISTS idx_partidas_tema       ON partidas(tema)");

export default db;
