// LogoutUsuario.js

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutbtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const result = await Swal.fire({
        title: "¿Deseas cerrar sesión?",
        text: "Tu sesión actual se cerrará y deberás iniciar nuevamente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, salir",
        cancelButtonText: "No, cancelar",
      });

      if (result.isConfirmed) {
        // 🧹 Limpiar tokens y sesión
        localStorage.clear();
        sessionStorage.clear();

        // 🧠 Mostrar confirmación
        await Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });

        // 🚪 Redirigir correctamente al login (FRONTEND)
        // Cambia la ruta a donde realmente está tu archivo
        window.location.href =
          "LoginUsuario.html";

        // 🧱 Bloquear intento de volver atrás
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
          window.history.go(1);
        };
      }
    });
  }
});

// 🚫 Si alguien intenta volver sin token, lo redirigimos al login
window.addEventListener("pageshow", function () {
  const token = localStorage.getItem("access");
  if (!token) {
    window.location.href = "LoginUsuario.html";
  }
});
