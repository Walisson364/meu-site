function showToast(mensagem, tipo = "info") {

  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.classList.add("toast", tipo);

  toast.textContent = mensagem;

  container.appendChild(toast);

  // anima entrada
  setTimeout(() => {
    toast.classList.add("show");
  }, 50);

  // remover automático
  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);

  }, 3000);
}