const urlRegistro = "http://127.0.0.1:8000/TaskFlow/api/v1/registro";

function registrarUsuario() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    Swal.fire(
      "Campos vacíos",
      "Por favor completa todos los campos.",
      "warning"
    );
    return;
  }

  const data = { username, email, password };

  fetch(urlRegistro, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.detail || "Error al registrar el usuario.");
        });
      }
      return response.json();
    })
    .then(() => {
      Swal.fire(
        "¡Registro exitoso!",
        "Ya puedes iniciar sesión.",
        "success"
      ).then(() => {
        window.location.href = "LoginUsuario.html";
      });
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
}
