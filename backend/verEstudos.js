const db = require("./database/db");

db.all("SELECT tema, nivel FROM estudos", [], (err, rows) => {
  console.log(rows);
});