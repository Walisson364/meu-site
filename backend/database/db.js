const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "biblia.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Erro ao abrir banco:", err.message);
  } else {
    console.log("✅ Banco conectado!");
  }
});

// garante execução em ordem
db.serialize(() => {

  console.log("🔧 Verificando tabelas...");

  // ================= USERS
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )
  `);

  // ================= ESTUDOS
  db.run(`
    CREATE TABLE IF NOT EXISTS estudos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tema TEXT NOT NULL,
      nivel TEXT NOT NULL,
      versiculo TEXT NOT NULL,
      reflexao TEXT NOT NULL,
      pergunta TEXT NOT NULL,
      oracao TEXT NOT NULL
    )
  `);

  // ================= FAVORITOS
  db.run(`
    CREATE TABLE IF NOT EXISTS favoritos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      tema TEXT,
      versiculo TEXT,
      reflexao TEXT,
      pergunta TEXT,
      oracao TEXT,
      UNIQUE(user_id, versiculo)
    )
  `);

  console.log("✅ Tabelas prontas");
});

module.exports = db;