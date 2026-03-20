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
// GERAR ESTUDO SEM REPETIR
// ===============================
router.get("/", auth, (req, res) => {

  let { tema, nivel } = req.query;
  const userId = req.user.id;

  if (!tema || !nivel) {
    return res.status(400).json({ erro: "Tema ou nível não informado" });
  }

  tema = normalizar(tema);
  nivel = normalizar(nivel);

  db.all("SELECT * FROM estudos", [], (err, rows) => {

    if (err) {
      console.error("ERRO AO BUSCAR ESTUDOS:", err);
      return res.status(500).json({ erro: err.message });
    }

    console.log("TODOS ESTUDOS:", rows);

    const filtrados = rows.filter(e =>
      normalizar(e.tema) === tema &&
      normalizar(e.nivel) === nivel
    );

    console.log("FILTRADOS:", filtrados);

    if (filtrados.length === 0) {
      return res.status(404).json({ erro: "Nenhum estudo encontrado" });
    }

    // ===============================
    // PEGAR ESTUDOS JÁ VISTOS
    // ===============================
    db.get(
      "SELECT estudos_vistos FROM users WHERE id = ?",
      [userId],
      (err, user) => {

        if (err) {
          console.error("ERRO AO BUSCAR USER:", err);

          // 🔥 fallback (continua sem histórico)
          const aleatorio =
            filtrados[Math.floor(Math.random() * filtrados.length)];

          return res.json(aleatorio);
        }

        // se não existir coluna ou user
        if (!user || user.estudos_vistos === undefined) {
          console.warn("⚠️ estudos_vistos não existe, retornando aleatório");

          const aleatorio =
            filtrados[Math.floor(Math.random() * filtrados.length)];

          return res.json(aleatorio);
        }

        let vistos = [];

        try {
          vistos = JSON.parse(user.estudos_vistos || "[]");
        } catch {
          vistos = [];
        }

        // remover já vistos
        let disponiveis = filtrados.filter(
          e => !vistos.includes(e.id)
        );

        // se acabou → reinicia
        if (disponiveis.length === 0) {
          vistos = [];
          disponiveis = filtrados;
        }

        // escolher aleatório
        const escolhido =
          disponiveis[Math.floor(Math.random() * disponiveis.length)];

        vistos.push(escolhido.id);

        // salvar progresso (só se coluna existir)
        db.run(
          "UPDATE users SET estudos_vistos = ? WHERE id = ?",
          [JSON.stringify(vistos), userId],
          (err) => {
            if (err) {
              console.error("ERRO AO SALVAR VISTOS:", err);
            }
          }
        );

        res.json(escolhido);
      }
    );

  });

});

module.exports = router;