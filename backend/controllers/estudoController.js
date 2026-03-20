const db = require("../database/db");

// mesma função que você já usava antes
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

exports.buscarEstudo = (req, res) => {

  let { tema, nivel } = req.query;

  if (!tema || !nivel) {
    return res.status(400).json({
      erro: "Tema ou nível não informado"
    });
  }

  tema = normalizar(tema);
  nivel = normalizar(nivel);

  db.all("SELECT * FROM estudos", [], (err, rows) => {

    if (err) {
      console.error("ERRO SQLITE:", err);
      return res.status(500).json({
        erro: "Erro no banco"
      });
    }

    const filtrados = rows.filter(e =>
      normalizar(e.tema) === tema &&
      normalizar(e.nivel) === nivel
    );

    if (!filtrados.length) {
      return res.json({
        erro: "Nenhum estudo encontrado"
      });
    }

    const estudo =
      filtrados[Math.floor(Math.random() * filtrados.length)];

    res.json(estudo);
  });
};