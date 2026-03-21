const express = require("express");
const router = express.Router();
const db = require("../database/db");
const auth = require("../middleware/authMiddleware");

// ===============================
// SALVAR FAVORITO
// ===============================
router.post("/", auth, (req, res) => {

  const user_id = req.user.id;
  const { tema, versiculo, reflexao, pergunta, oracao } = req.body;

  try {

    const stmt = db.prepare(`
      INSERT INTO favoritos
      (user_id, tema, versiculo, reflexao, pergunta, oracao)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      user_id, tema, versiculo, reflexao, pergunta, oracao
    );

    res.json({
      favoritado: true,
      id: result.lastInsertRowid
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: err.message });
  }
});


// ===============================
// LISTAR FAVORITOS
// ===============================
router.get("/", auth, (req, res) => {

  const user_id = req.user.id;

  try {

    const rows = db
      .prepare("SELECT * FROM favoritos WHERE user_id = ?")
      .all(user_id);

    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: err.message });
  }
});


// ===============================
// EXCLUIR FAVORITO
// ===============================
router.delete("/:id", auth, (req, res) => {

  const user_id = req.user.id;
  const { id } = req.params;

  try {

    db.prepare(
      "DELETE FROM favoritos WHERE id = ? AND user_id = ?"
    ).run(id, user_id);

    res.json({ mensagem: "Favorito removido ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao excluir" });
  }
});


// ===============================
// CHECK FAVORITO
// ===============================
router.get("/check/:versiculo", auth, (req, res) => {

  const user_id = req.user.id;
  const versiculo = req.params.versiculo;

  try {

    const row = db.prepare(
      "SELECT id FROM favoritos WHERE versiculo = ? AND user_id = ?"
    ).get(versiculo, user_id);

    res.json({ salvo: !!row });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;