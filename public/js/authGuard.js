// ===============================
// AUTH GUARD GLOBAL
// ===============================

const Auth = {

  getToken() {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token === "null") {
      return null;
    }

    return token;
  },

  isLogged() {
    return !!this.getToken();
  },

  // ✅ decodifica JWT
  getUser() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  },

  guard() {
    const pagina = window.location.pathname;
    const estaLogado = this.isLogged();

    const paginasAuth =
      pagina.includes("login.html") ||
      pagina.includes("register.html");

    const paginaProtegida =
      pagina.includes("index.html") ||
      pagina === "/" ||
      pagina.endsWith("/");

    if (estaLogado && paginasAuth) {
      window.location.href = "index.html";
      return;
    }

    if (!estaLogado && paginaProtegida) {
      window.location.href = "login.html";
      return;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Auth.guard();
});