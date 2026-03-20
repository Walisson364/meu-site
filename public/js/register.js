document.addEventListener("DOMContentLoaded", () => {

const API = "http://localhost:3000";
const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  try {

    const resposta = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      showToast(dados.erro || "Erro ao cadastrar", "error");
      return;
    }

    // ✅ salva token automaticamente
    localStorage.setItem("token", dados.token);

    showToast("Conta criada! Entrando...", "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);

  } catch (err) {
    console.error(err);
    showToast("Servidor offline", "error");
  }

});

});