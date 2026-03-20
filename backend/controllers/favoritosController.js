const db = require("../database");


// SALVAR FAVORITO
exports.salvarFavorito = (req, res) => {

    const { tema, versiculo, reflexao, pergunta, oracao } = req.body;

    const sql = `
    INSERT INTO favoritos (tema, versiculo, reflexao, pergunta, oracao)
    VALUES (?, ?, ?, ?, ?)
    `;

    db.run(sql, [tema, versiculo, reflexao, pergunta, oracao], function(err){

        if(err){
            return res.status(500).json({ erro: "Erro ao salvar favorito" });
        }

        res.json({ mensagem: "Favorito salvo!" });

    });

};



// LISTAR FAVORITOS
exports.listarFavoritos = (req, res) => {

    db.all("SELECT * FROM favoritos", [], (err, rows) => {

        if(err){
            return res.status(500).json({ erro: "Erro ao buscar favoritos" });
        }

        res.json(rows);

    });

};