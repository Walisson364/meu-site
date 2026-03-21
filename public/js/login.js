document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");

  // evita erro se não estiver na página de login
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
      const resposta = await fetch(`${API_URL}/auth/login`, {
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

      // 🔥 salva token
      localStorage.setItem("token", dados.token);

      // 🔥 redireciona
      window.location.href = "index.html";

    } catch (erro) {
      console.error("Erro:", erro);
      alert("Servidor offline ou inacessível");
    }
  });

});