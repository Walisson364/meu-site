document.addEventListener("DOMContentLoaded", () => {

  const userArea = document.getElementById("userArea");

  // segurança caso o elemento não exista
  if (!userArea) return;

  const user = Auth.getUser();

  // ===============================
  // NÃO LOGADO
  // ===============================
  if (!user) {
    userArea.innerHTML = `
      <a href="login.html">Login</a>
      <a href="register.html">Registrar</a>
    `;
    return;
  }

  // ===============================
  // LOGADO
  // ===============================
  userArea.innerHTML = `
    <span class="user-name">
      Olá, ${user.nome || user.email} 👋
    </span>
    <button id="logoutBtn" class="logout-btn">Sair</button>
  `;

  // logout usando o Auth global
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    Auth.logout();
  });

});