const express = require("express");
const router = express.Router();
const db = require("../database/db");
const auth = require("../middleware/authMiddleware");

// normalizar texto
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// ===============================
// GERAR ESTUDO
// ===============================
router.get("/", auth, (req, res) => {

  let { tema, nivel } = req.query;
  const userId = req.user.id;

  if (!tema || !nivel) {
    return res.status(400).json({ erro: "Tema ou nível não informado" });
  }

  tema = normalizar(tema);
  nivel = normalizar(nivel);

  try {

    // 🔥 pega estudos
    const rows = db.prepare("SELECT * FROM estudos").all();

    const filtrados = rows.filter(e =>
      normalizar(e.tema) === tema &&
      normalizar(e.nivel) === nivel
    );

    if (filtrados.length === 0) {
      return res.status(404).json({ erro: "Nenhum estudo encontrado" });
    }

    // 🔥 pega usuário
    const user = db.prepare(
      "SELECT estudos_vistos FROM users WHERE id = ?"
    ).get(userId);

    let vistos = [];

    if (user && user.estudos_vistos) {
      try {
        vistos = JSON.parse(user.estudos_vistos);
      } catch {
        vistos = [];
      }
    }

    let disponiveis = filtrados.filter(
      e => !vistos.includes(e.id)
    );

    if (disponiveis.length === 0) {
      vistos = [];
      disponiveis = filtrados;
    }

    const escolhido =
      disponiveis[Math.floor(Math.random() * disponiveis.length)];

    vistos.push(escolhido.id);

    // 🔥 salva progresso
    db.prepare(
      "UPDATE users SET estudos_vistos = ? WHERE id = ?"
    ).run(JSON.stringify(vistos), userId);

    res.json(escolhido);

  } catch (err) {
    console.error("ERRO ESTUDOS:", err);
    res.status(500).json({ erro: "Erro no servidor" });
  }

});

module.exports = router;