const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./banco.db");

// cria tabela se não existir
db.run(`
CREATE TABLE IF NOT EXISTS favoritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tema TEXT,
    versiculo TEXT,
    reflexao TEXT,
    pergunta TEXT,
    oracao TEXT
)
`);

module.exports = db;