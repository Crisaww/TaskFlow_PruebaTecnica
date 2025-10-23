const urlLogin = "http://127.0.0.1:8000/TaskFlow/api/v1/iniciar-sesion/";

function iniciarSesion() {
  const identifier = document.getElementById("username").value.trim(); // puede ser correo o usuario
  const password = document.getElementById("password").value.trim();

  if (!identifier || !password) {
    Swal.fire(
      "Campos vacíos",
      "Por favor completa todos los campos.",
      "warning"
    );
    return;
  }

  fetch(urlLogin, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Credenciales incorrectas.");
      }

      // Guardar tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("username", data.username);

      Swal.fire({
        title: "Bienvenido",
        text: "Inicio de sesión exitoso.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "Index.html";
      });
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
}
