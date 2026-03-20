// ===============================
// API CLIENT GLOBAL
// ===============================

const API_URL = "http://localhost:3000";

const API = {

  getToken() {
    return localStorage.getItem("token");
  },

  async request(endpoint, options = {}) {

    const token = this.getToken();

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    };

    // adiciona token automaticamente
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);

      // 🔥 token inválido ou expirado
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
      }

      return response;

    } catch (err) {
      console.error("Erro API:", err);
      alert("Servidor indisponível");
    }
  }
};