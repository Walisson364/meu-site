const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "biblia.db");

// cria/conecta banco
const db = new Database(dbPath);

console.log("✅ Banco conectado!");

// ================= TABELAS
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS estudos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tema TEXT NOT NULL,
    nivel TEXT NOT NULL,
    versiculo TEXT NOT NULL,
    reflexao TEXT NOT NULL,
    pergunta TEXT NOT NULL,
    oracao TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS favoritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    tema TEXT,
    versiculo TEXT,
    reflexao TEXT,
    pergunta TEXT,
    oracao TEXT,
    UNIQUE(user_id, versiculo)
  );
`);

console.log("✅ Tabelas prontas");

// 🔥 ADICIONA A COLUNA SE NÃO EXISTIR
try {
  db.prepare(`
    ALTER TABLE users ADD COLUMN estudos_vistos TEXT
  `).run();
  console.log("✅ Coluna estudos_vistos criada");
} catch (e) {
  console.log("⚠️ Coluna estudos_vistos já existe");
}

module.exports = db;