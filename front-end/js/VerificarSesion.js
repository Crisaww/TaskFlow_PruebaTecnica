// VerificarSesion.js

document.addEventListener("DOMContentLoaded", () => {
  const tokenAcceso = localStorage.getItem("access");

  // Si no hay token, redirige al login
  if (!tokenAcceso) {
    window.location.href = "./LoginUsuario.html";
    return;
  }

  // Evita regresar al index después de cerrar sesión
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
  };
});
