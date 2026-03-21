const fs = require("fs");
const path = require("path");

// ===============================
// BASE DE VERSETOS (expandida)
// ===============================
const versiculosBase = [

  // ================= FÉ =================
  {
    tema: "Fé",
    versiculo: "Hebreus 11:1",
    texto: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos."
  },
  {
    tema: "Fé",
    versiculo: "Romanos 10:17",
    texto: "A fé vem pelo ouvir, e o ouvir pela palavra de Deus."
  },
  {
    tema: "Fé",
    versiculo: "2 Coríntios 5:7",
    texto: "Porque vivemos por fé, e não pelo que vemos."
  },
  {
    tema: "Fé",
    versiculo: "Mateus 17:20",
    texto: "Se vocês tiverem fé do tamanho de um grão de mostarda..."
  },
  {
    tema: "Fé",
    versiculo: "Marcos 11:24",
    texto: "Tudo o que vocês pedirem em oração, creiam que já o receberam."
  },

  // ================= ANSIEDADE =================
  {
    tema: "Ansiedade",
    versiculo: "Filipenses 4:6-7",
    texto: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração..."
  },
  {
    tema: "Ansiedade",
    versiculo: "1 Pedro 5:7",
    texto: "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês."
  },
  {
    tema: "Ansiedade",
    versiculo: "Mateus 6:34",
    texto: "Portanto, não se preocupem com o amanhã."
  },
  {
    tema: "Ansiedade",
    versiculo: "Salmos 55:22",
    texto: "Entregue suas preocupações ao Senhor, e ele o susterá."
  },
  {
    tema: "Ansiedade",
    versiculo: "João 14:27",
    texto: "Deixo-lhes a paz; a minha paz lhes dou."
  },

  // ================= PERDÃO =================
  {
    tema: "Perdão",
    versiculo: "Efésios 4:32",
    texto: "Sejam bondosos e compassivos uns para com os outros."
  },
  {
    tema: "Perdão",
    versiculo: "Colossenses 3:13",
    texto: "Perdoem como o Senhor lhes perdoou."
  },
  {
    tema: "Perdão",
    versiculo: "Mateus 6:14",
    texto: "Se vocês perdoarem as pessoas..."
  },
  {
    tema: "Perdão",
    versiculo: "Lucas 6:37",
    texto: "Perdoem, e serão perdoados."
  },
  {
    tema: "Perdão",
    versiculo: "1 João 1:9",
    texto: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar."
  },

  // ================= PROPÓSITO =================
  {
    tema: "Propósito",
    versiculo: "Jeremias 29:11",
    texto: "Porque eu sei os planos que tenho para vocês, diz o Senhor."
  },
  {
    tema: "Propósito",
    versiculo: "Romanos 8:28",
    texto: "Todas as coisas cooperam para o bem daqueles que amam a Deus."
  },
  {
    tema: "Propósito",
    versiculo: "Provérbios 19:21",
    texto: "Muitos são os planos no coração do homem."
  },
  {
    tema: "Propósito",
    versiculo: "Efésios 2:10",
    texto: "Somos criação de Deus realizada em Cristo Jesus."
  },
  {
    tema: "Propósito",
    versiculo: "Salmos 138:8",
    texto: "O Senhor cumprirá o seu propósito para comigo."
  }

];

// ===============================
// NÍVEIS
// ===============================
const niveis = ["Iniciante", "Intermediário", "Avançado"];

// ===============================
// GERADORES
// ===============================
function gerarReflexao(tema, nivel) {

  if (nivel === "Iniciante")
    return `Deus nos ensina sobre ${tema.toLowerCase()} através da Sua Palavra. Pequenos passos transformam nossa caminhada.`;

  if (nivel === "Intermediário")
    return `O crescimento espiritual exige prática diária de ${tema.toLowerCase()}. Deus trabalha em nós mesmo nas dificuldades.`;

  return `A maturidade espiritual revela que ${tema.toLowerCase()} não depende das circunstâncias, mas da confiança em Deus.`;
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
// SALVAR
// ===============================
const caminhoArquivo = path.join(__dirname, "data", "estudos.json");

fs.writeFileSync(
  caminhoArquivo,
  JSON.stringify(estudosGerados, null, 2),
  "utf8"
);

console.log("✅ Estudos gerados com sucesso!");
console.log(`Total criado: ${estudosGerados.length}`);