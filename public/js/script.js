document.addEventListener("DOMContentLoaded", () => {

const token = localStorage.getItem("token");

// ===============================
// PROTEÇÃO LOGIN
// ===============================
if (!token || token === "undefined" || token === "null") {
  window.location.href = "login.html";
  return;
}

// ===============================
// FETCH CENTRAL
// ===============================
async function apiFetch(endpoint, options = {}) {
  return await API.request(endpoint, options);
}

// ===============================
let temaSelecionado = "";
let tempoSelecionado = "";
let nivelSelecionado = "";
let estudoAtual = null;
let favoritadoAtual = false;

// ===============================
// TOAST
// ===============================
function showToast(msg, type="info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = msg;

  document.body.appendChild(toast);

  setTimeout(()=> toast.classList.add("show"), 50);

  setTimeout(()=>{
    toast.classList.remove("show");
    setTimeout(()=> toast.remove(),300);
  },3000);
}

// ===============================
// SELEÇÃO BOTÕES
// ===============================
function ativarSelecao(seletor, salvarValor){
  const botoes = document.querySelectorAll(seletor);

  botoes.forEach(botao=>{
    botao.addEventListener("click", ()=>{
      botoes.forEach(b=>b.classList.remove("ativo"));
      botao.classList.add("ativo");

      salvarValor(botao.textContent.trim());
    });
  });
}

ativarSelecao(".tema button", v=>temaSelecionado=v);
ativarSelecao(".tempo button", v=>tempoSelecionado=v);
ativarSelecao(".nivel button", v=>nivelSelecionado=v);

// ===============================
// ELEMENTOS
// ===============================
const botaoGerar = document.querySelector(".gerar");
const botaoFavoritar = document.querySelector("#salvarFavorito");
const botaoVerFavoritos = document.querySelector(".ver-favoritos");

const loading = document.querySelector(".loading");
const resultado = document.querySelector(".resultado");
const listaFavoritos = document.querySelector(".lista-favoritos");
const favoritosContainer = document.getElementById("favoritos-container");

// ===============================
// SKELETON
// ===============================
function mostrarSkeleton(){
  loading.style.display="block";
}

function esconderSkeleton(){
  loading.style.display="none";
}

// ===============================
// BOTÃO FAVORITO VISUAL
// ===============================
function atualizarBotaoFavorito(ativo){
  favoritadoAtual = ativo;

  if(!botaoFavoritar) return;

  if(ativo){
    botaoFavoritar.textContent = "❤️ Favoritado";
    botaoFavoritar.classList.add("ativo");
  }else{
    botaoFavoritar.textContent = "🤍 Salvar nos Favoritos";
    botaoFavoritar.classList.remove("ativo");
  }
}

// ===============================
// RENDER FAVORITOS
// ===============================
function renderFavoritos(favoritos){

  if(!favoritosContainer) return;

  favoritosContainer.innerHTML = "";

  if(!Array.isArray(favoritos) || favoritos.length === 0){
    favoritosContainer.innerHTML =
      "<p>Nenhum favorito salvo ainda.</p>";
    return;
  }

  favoritos.forEach(fav=>{

    const div=document.createElement("div");
    div.classList.add("card-favorito");

    div.innerHTML=`
      <hr>
      <p><b>${fav.tema || ""}</b></p>
      <p>${fav.versiculo}</p>
      <p>${fav.reflexao}</p>
      <button class="excluir">Excluir</button>
    `;

    favoritosContainer.appendChild(div);

    div.querySelector(".excluir")
    .addEventListener("click", async () => {

      await apiFetch(`/favoritos/${fav.id}`, {
        method:"DELETE"
      });

      showToast("Favorito removido","success");
      await carregarFavoritos();

      if(estudoAtual &&
         fav.versiculo === estudoAtual.versiculo){
        atualizarBotaoFavorito(false);
      }
    });

  });

  listaFavoritos.style.display="block";
}

// ===============================
// CARREGAR FAVORITOS
// ===============================
async function carregarFavoritos(){
  try{
    const res = await apiFetch("/favoritos");
    const favoritos = await res.json(); // ✅ CORRIGIDO
    renderFavoritos(favoritos);
  }catch(err){
    console.error(err);
    showToast("Erro ao carregar favoritos","error");
  }
}

botaoVerFavoritos?.addEventListener("click", async ()=>{
  if(listaFavoritos.style.display === "block"){
    listaFavoritos.style.display = "none";
    return;
  }

  await carregarFavoritos();
});

// ===============================
// GERAR ESTUDO (🔥 PRINCIPAL)
// ===============================
botaoGerar?.addEventListener("click", async ()=>{

  if(!temaSelecionado || !tempoSelecionado || !nivelSelecionado){
    showToast("Escolha tema, tempo e nível!","info");
    return;
  }

  resultado.style.display="none";
  mostrarSkeleton();

  try{

    const res = await apiFetch(
      `/estudos?tema=${temaSelecionado}&nivel=${nivelSelecionado}`
    );

    const estudo = await res.json(); // ✅ AQUI ESTAVA O ERRO

    estudoAtual = estudo;

    if(estudo.erro){
      esconderSkeleton();
      showToast(estudo.erro,"error");
      return;
    }

    document.getElementById("versiculo").textContent = estudo.versiculo;
    document.getElementById("reflexao").textContent = estudo.reflexao;
    document.getElementById("pergunta").textContent = estudo.pergunta;
    document.getElementById("oracao").textContent = estudo.oracao;

    esconderSkeleton();
    resultado.style.display="block";

    showToast("Estudo gerado!","success");

    const resStatus = await apiFetch(
      `/favoritos/check/${encodeURIComponent(estudo.versiculo)}`
    );

    const status = await resStatus.json(); // ✅ CORRIGIDO

    atualizarBotaoFavorito(status.salvo);

  }catch(err){
    console.error(err);
    esconderSkeleton();
    showToast("Erro ao conectar servidor","error");
  }

});

// ===============================
// SALVAR / REMOVER FAVORITO
// ===============================
botaoFavoritar?.addEventListener("click", async () => {

  if(!estudoAtual){
    showToast("Gere um estudo primeiro","info");
    return;
  }

  botaoFavoritar.disabled = true;

  try{

    if(favoritadoAtual){

      const res = await apiFetch("/favoritos");
      const favoritos = await res.json(); // ✅ CORRIGIDO

      const fav = favoritos.find(
        f => f.versiculo === estudoAtual.versiculo
      );

      if(fav){
        await apiFetch(`/favoritos/${fav.id}`, {
          method:"DELETE"
        });
      }

      atualizarBotaoFavorito(false);
      showToast("Favorito removido","success");

    } else {

      await apiFetch("/favoritos",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          tema: temaSelecionado,
          versiculo: estudoAtual.versiculo,
          reflexao: estudoAtual.reflexao,
          pergunta: estudoAtual.pergunta,
          oracao: estudoAtual.oracao
        })
      });

      atualizarBotaoFavorito(true);
      showToast("Favorito salvo!","success");
    }

    await carregarFavoritos();

  }catch(err){
    console.error(err);
    showToast("Erro ao atualizar favorito","error");
  }

  botaoFavoritar.disabled = false;
});

});