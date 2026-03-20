const db = require("./database/db");

db.all("PRAGMA table_info(favoritos);", [], (err, rows) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("COLUNAS DA TABELA FAVORITOS:");
  console.table(rows);
});