const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// conecta banco
const db = new sqlite3.Database("./database/biblia.db");

// cria tabela estudos
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS estudos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tema TEXT,
      nivel TEXT,
      versiculo TEXT,
      reflexao TEXT,
      pergunta TEXT,
      oracao TEXT
    )
  `);

  // limpa tabela (evita duplicados)
  db.run("DELETE FROM estudos");

  // lê JSON
  const caminho = path.join(__dirname, "data", "estudos.json");
  const estudos = JSON.parse(fs.readFileSync(caminho, "utf8"));

  const stmt = db.prepare(`
    INSERT INTO estudos
    (tema, nivel, versiculo, reflexao, pergunta, oracao)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  estudos.forEach(e => {
    stmt.run(
      e.tema,
      e.nivel,
      e.versiculo,
      e.reflexao,
      e.pergunta,
      e.oracao
    );
  });

  stmt.finalize();

  console.log("✅ Estudos importados com sucesso!");

});

db.close();