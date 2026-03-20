const API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");

  // evita erro se o script carregar em outra página
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // validação básica
    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const resposta = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Email ou senha inválidos");
        return;
      }

      // ✅ salva token
      localStorage.setItem("token", dados.token);

      // ✅ redireciona direto (não precisa setTimeout)
      window.location.href = "index.html";

    } catch (erro) {
      console.error("Erro:", erro);
      alert("Servidor offline ou inacessível");
    }
  });

});