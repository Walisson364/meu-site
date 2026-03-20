const db = require("./database/db");

db.run(
  `ALTER TABLE favoritos ADD COLUMN user_id INTEGER`,
  (err) => {

    if (err) {
      console.log("⚠️ Talvez a coluna já exista:", err.message);
    } else {
      console.log("✅ user_id adicionada com sucesso!");
    }

    process.exit();
  }
);