const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "meu_segredo";


// =================================================
// REGISTRAR USUÁRIO
// =================================================
exports.register = (req, res) => {

  console.log("REGISTER RECEBIDO:", req.body);

  const { nome, email, senha } = req.body;

  // validação básica
  if (!nome || !email || !senha) {
    return res.status(400).json({
      erro: "Preencha todos os campos"
    });
  }

  try {

    // cria hash da senha
    const hash = bcrypt.hashSync(senha, 10);

    db.run(
      "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, hash],
      function (err) {

        if (err) {
          console.log("ERRO REGISTER:", err);
          return res.status(400).json({
            erro: "Email já cadastrado"
          });
        }

        // cria token JWT
        const token = jwt.sign(
          {
            id: this.lastID,
            nome: nome
          },
          SECRET,
          { expiresIn: "7d" }
        );

        return res.json({
          mensagem: "Conta criada ✅",
          token
        });
      }
    );

  } catch (error) {
    console.log("ERRO GERAL REGISTER:", error);

    res.status(500).json({
      erro: "Erro interno do servidor"
    });
  }
};


// =================================================
// LOGIN
// =================================================
exports.login = (req, res) => {

  console.log("LOGIN RECEBIDO:", req.body);

  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      erro: "Preencha todos os campos"
    });
  }

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user) => {

      if (err) {
        console.log("ERRO DB:", err);
        return res.status(500).json({
          erro: "Erro no servidor"
        });
      }

      if (!user) {
        return res.status(404).json({
          erro: "Usuário não encontrado"
        });
      }

      // verifica senha
      const senhaValida = bcrypt.compareSync(
        senha,
        user.senha
      );

      if (!senhaValida) {
        return res.status(401).json({
          erro: "Senha incorreta"
        });
      }

      // cria token JWT
      const token = jwt.sign(
        {
          id: user.id,
          nome: user.nome
        },
        SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        mensagem: "Login realizado ✅",
        token
      });
    }
  );
};