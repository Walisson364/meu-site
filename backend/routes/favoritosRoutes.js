const express = require("express");
const router = express.Router();
const db = require("../database/db");
const auth = require("../middleware/authMiddleware");


// ===============================
// SALVAR FAVORITO
// ===============================
router.post("/", auth, (req, res) => {

  const user_id = req.user.id; // ⭐ vem do JWT
  const { tema, versiculo, reflexao, pergunta, oracao } = req.body;

  const sql = `
    INSERT INTO favoritos
    (user_id, tema, versiculo, reflexao, pergunta, oracao)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [user_id, tema, versiculo, reflexao, pergunta, oracao],
    function(err){

      if(err){
        console.error(err);
        return res.status(500).json({ erro: err.message });
      }

      res.json({
        favoritado: true,
        id: this.lastID
      });
    }
  );
});


// ===============================
// LISTAR FAVORITOS
// ===============================
router.get("/", auth, (req, res) => {

  const user_id = req.user.id;

  db.all(
    "SELECT * FROM favoritos WHERE user_id = ?",
    [user_id],
    (err, rows) => {

      if(err){
        console.error(err);
        return res.status(500).json({ erro: err.message });
      }

      res.json(rows);
    }
  );
});


// ===============================
// EXCLUIR FAVORITO
// ===============================
router.delete("/:id", auth, (req, res) => {

  const user_id = req.user.id;
  const { id } = req.params;

  db.run(
    "DELETE FROM favoritos WHERE id = ? AND user_id = ?",
    [id, user_id],
    function(err){

      if(err){
        console.error(err);
        return res.status(500).json({ erro: "Erro ao excluir" });
      }

      res.json({ mensagem: "Favorito removido ✅" });
    }
  );
});


// ===============================
// CHECK FAVORITO
// ===============================
router.get("/check/:versiculo", auth, (req, res) => {

  const user_id = req.user.id;
  const versiculo = req.params.versiculo;

  db.get(
    "SELECT id FROM favoritos WHERE versiculo = ? AND user_id = ?",
    [versiculo, user_id],
    (err, row) => {

      if(err){
        console.error(err);
        return res.status(500).json({ erro: err.message });
      }

      res.json({ salvo: !!row });
    }
  );
});

module.exports = router;