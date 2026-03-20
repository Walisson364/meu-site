const fs = require("fs");
const path = require("path");

// ===============================
// BASE DE VERSETOS (adicione quantos quiser)
// ===============================
const versiculosBase = [
  {
    tema: "Fé",
    versiculo: "Hebreus 11:1",
    texto: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos."
  },
  {
    tema: "Ansiedade",
    versiculo: "Filipenses 4:6",
    texto: "Não andem ansiosos por coisa alguma."
  },
  {
    tema: "Perdão",
    versiculo: "Efésios 4:32",
    texto: "Sejam bondosos e compassivos uns para com os outros."
  },
  {
    tema: "Propósito",
    versiculo: "Jeremias 29:11",
    texto: "Porque eu sei os planos que tenho para vocês, diz o Senhor."
  },
  {
    tema: "Força",
    versiculo: "Isaías 40:30",
    texto: "Os jovens se cansam e se fatigam, e os moços de exaustos caem."
  }
];

// ===============================
// NÍVEIS
// ===============================
const niveis = ["Iniciante", "Intermediário", "Avançado"];


// ===============================
// GERADORES AUTOMÁTICOS
// ===============================
function gerarReflexao(tema, nivel) {

  if (nivel === "Iniciante")
    return `Deus nos ensina sobre ${tema.toLowerCase()} através da Sua Palavra. Pequenos passos de fé transformam nossa caminhada.`;

  if (nivel === "Intermediário")
    return `O crescimento espiritual exige prática diária de ${tema.toLowerCase()}. Deus trabalha em nós mesmo nas dificuldades.`;

  return `A maturidade espiritual revela que ${tema.toLowerCase()} não depende das circunstâncias, mas da confiança constante em Deus.`;
}

function gerarPergunta(tema) {
  return `Como você pode viver ${tema.toLowerCase()} de forma prática hoje?`;
}

function gerarOracao(tema) {
  return `Senhor, ajuda-me a viver ${tema.toLowerCase()} diariamente segundo a Tua vontade.`;
}


// ===============================
// GERAR ESTUDOS
// ===============================
const estudosGerados = [];

versiculosBase.forEach(v => {

  niveis.forEach(nivel => {

    estudosGerados.push({
      tema: v.tema,
      nivel: nivel,
      versiculo: v.versiculo,
      texto: v.texto,
      reflexao: gerarReflexao(v.tema, nivel),
      pergunta: gerarPergunta(v.tema),
      oracao: gerarOracao(v.tema)
    });

  });

});


// ===============================
// SALVAR ARQUIVO
// ===============================
const caminhoArquivo = path.join(__dirname, "data", "estudos.json");

fs.writeFileSync(
  caminhoArquivo,
  JSON.stringify(estudosGerados, null, 2),
  "utf8"
);

console.log("✅ Estudos gerados com sucesso!");
console.log(`Total criado: ${estudosGerados.length}`);