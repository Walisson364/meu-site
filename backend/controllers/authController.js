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

    // hash da senha
    const hash = bcrypt.hashSync(senha, 10);

    // 🔥 INSERT com better-sqlite3
    const stmt = db.prepare(
      "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)"
    );

    const result = stmt.run(nome, email, hash);

    // cria token
    const token = jwt.sign(
      {
        id: result.lastInsertRowid,
        nome: nome
      },
      SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      mensagem: "Conta criada ✅",
      token
    });

  } catch (error) {

    console.log("ERRO REGISTER:", error);

    return res.status(400).json({
      erro: "Email já cadastrado"
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

  try {

    // 🔥 SELECT com better-sqlite3
    const stmt = db.prepare(
      "SELECT * FROM users WHERE email = ?"
    );

    const user = stmt.get(email);

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

    // cria token
    const token = jwt.sign(
      {
        id: user.id,
        nome: user.nome
      },
      SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      mensagem: "Login realizado ✅",
      token
    });

  } catch (error) {

    console.log("ERRO LOGIN:", error);

    return res.status(500).json({
      erro: "Erro interno do servidor"
    });
  }
};