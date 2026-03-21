const fs = require("fs");
const path = require("path");

// ===============================
// BASE DE VERSETOS
// ===============================
const versiculosBase = [

  // ================= FÉ =================
  { tema: "Fé", versiculo: "Hebreus 11:1", texto: "A fé é a certeza daquilo que esperamos..." },
  { tema: "Fé", versiculo: "Romanos 10:17", texto: "A fé vem pelo ouvir..." },
  { tema: "Fé", versiculo: "2 Coríntios 5:7", texto: "Vivemos por fé..." },
  { tema: "Fé", versiculo: "Marcos 11:24", texto: "Tudo o que pedirem em oração..." },

  // ================= ANSIEDADE =================
  { tema: "Ansiedade", versiculo: "Filipenses 4:6", texto: "Não andem ansiosos..." },
  { tema: "Ansiedade", versiculo: "1 Pedro 5:7", texto: "Lancem sobre Ele..." },
  { tema: "Ansiedade", versiculo: "Mateus 6:34", texto: "Não se preocupem..." },

  // ================= PERDÃO =================
  { tema: "Perdão", versiculo: "Efésios 4:32", texto: "Sejam bondosos..." },
  { tema: "Perdão", versiculo: "Colossenses 3:13", texto: "Perdoem uns aos outros..." },
  { tema: "Perdão", versiculo: "Lucas 6:37", texto: "Perdoem, e serão perdoados." },

  // ================= PROPÓSITO =================
  { tema: "Propósito", versiculo: "Jeremias 29:11", texto: "Eu sei os planos..." },
  { tema: "Propósito", versiculo: "Romanos 8:28", texto: "Tudo coopera..." },
  { tema: "Propósito", versiculo: "Efésios 2:10", texto: "Somos criação de Deus..." }

];

// ===============================
// NÍVEIS
// ===============================
const niveis = ["Iniciante", "Intermediário", "Avançado"];

// ===============================
// BASE INTELIGENTE (VARIAÇÃO)
// ===============================
const banco = {

  "Fé": {
    reflexao: {
      Iniciante: [
        "A fé começa com pequenos passos de confiança em Deus.",
        "Mesmo sem ver, confiar em Deus é o início da fé.",
        "Deus nos chama a confiar nEle todos os dias."
      ],
      Intermediário: [
        "A fé cresce quando confiamos em Deus nas dificuldades.",
        "Desafios fortalecem nossa fé quando não desistimos.",
        "Crer em Deus nos sustenta em momentos difíceis."
      ],
      Avançado: [
        "A fé verdadeira permanece firme independente das circunstâncias.",
        "Confiar em Deus acima de tudo revela maturidade espiritual.",
        "A fé sólida não depende do que vemos, mas de quem Deus é."
      ]
    },
    pergunta: [
      "Onde você precisa confiar mais em Deus hoje?",
      "O que está desafiando sua fé neste momento?",
      "Como você pode fortalecer sua fé hoje?"
    ],
    oracao: [
      "Senhor, fortalece minha fé todos os dias.",
      "Deus, me ensina a confiar mais em Ti.",
      "Pai, aumenta minha fé nas dificuldades."
    ]
  },

  "Ansiedade": {
    reflexao: {
      Iniciante: [
        "Deus cuida de você, então não carregue tudo sozinho.",
        "Você não precisa viver preso à preocupação.",
        "Deus quer te dar paz em meio ao caos."
      ],
      Intermediário: [
        "Entregar a ansiedade a Deus é uma prática diária.",
        "Confiar em Deus reduz o peso da ansiedade.",
        "A paz começa quando entregamos o controle."
      ],
      Avançado: [
        "A paz de Deus supera qualquer ansiedade.",
        "Descansar em Deus traz equilíbrio ao coração.",
        "Quem confia em Deus vive com menos medo."
      ]
    },
    pergunta: [
      "O que está te causando ansiedade hoje?",
      "Você já entregou suas preocupações a Deus?",
      "Como você pode confiar mais em Deus hoje?"
    ],
    oracao: [
      "Senhor, tira minha ansiedade e me dá paz.",
      "Deus, acalma meu coração.",
      "Pai, eu entrego minhas preocupações a Ti."
    ]
  },

  "Perdão": {
    reflexao: {
      Iniciante: [
        "Perdoar é uma escolha que traz liberdade.",
        "Guardar mágoa só machuca você.",
        "Deus nos ensina a perdoar sempre."
      ],
      Intermediário: [
        "O perdão nos aproxima de Deus.",
        "Perdoar é difícil, mas transforma o coração.",
        "Quem perdoa vive mais leve."
      ],
      Avançado: [
        "Perdoar profundamente reflete o amor de Cristo.",
        "O perdão é sinal de maturidade espiritual.",
        "Liberar perdão é viver como Jesus ensinou."
      ]
    },
    pergunta: [
      "Existe alguém que você precisa perdoar?",
      "O que está te impedindo de perdoar?",
      "Como você pode liberar perdão hoje?"
    ],
    oracao: [
      "Senhor, me ajuda a perdoar de verdade.",
      "Deus, tira toda mágoa do meu coração.",
      "Pai, me ensina a perdoar como Tu perdoas."
    ]
  },

  "Propósito": {
    reflexao: {
      Iniciante: [
        "Deus tem um plano para sua vida.",
        "Sua vida tem valor e direção em Deus.",
        "Deus está guiando seus passos."
      ],
      Intermediário: [
        "Descobrir o propósito exige confiar em Deus.",
        "Cada fase faz parte do plano de Deus.",
        "Deus trabalha mesmo quando você não entende."
      ],
      Avançado: [
        "Viver o propósito é alinhar-se com Deus.",
        "O propósito se revela na obediência.",
        "Deus cumpre Seus planos no tempo certo."
      ]
    },
    pergunta: [
      "Você está vivendo o propósito de Deus?",
      "O que Deus está te chamando para fazer?",
      "Como você pode se alinhar com Deus hoje?"
    ],
    oracao: [
      "Senhor, mostra-me meu propósito.",
      "Deus, guia meus passos.",
      "Pai, quero viver Teus planos."
    ]
  }

};

// ===============================
// FUNÇÃO ALEATÓRIA
// ===============================
function pegarAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

// ===============================
// GERADORES INTELIGENTES
// ===============================
function gerarReflexao(tema, nivel) {
  return pegarAleatorio(banco[tema].reflexao[nivel]);
}

function gerarPergunta(tema) {
  return pegarAleatorio(banco[tema].pergunta);
}

function gerarOracao(tema) {
  return pegarAleatorio(banco[tema].oracao);
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

console.log("🔥 Estudos gerados com VARIAÇÃO!");
console.log(`Total criado: ${estudosGerados.length}`);