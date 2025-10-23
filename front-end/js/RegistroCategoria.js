const urlCategorias = "http://127.0.0.1:8000/TaskFlow/api/v1/category/";

document
  .getElementById("formCategoria")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombreCategoria = document
      .getElementById("nombreCategoria")
      .value.trim();
    const token = localStorage.getItem("access"); // token JWT guardado tras el login

    if (!token) {
      mostrarMensaje(
        "Debe iniciar sesión para registrar una categoría",
        "danger"
      );
      return;
    }

    const data = {
      name: nombreCategoria,
    };

    try {
      const response = await fetch(urlCategorias, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        mostrarMensaje("Categoría registrada correctamente", "success");
        document.getElementById("formCategoria").reset();
      } else {
        const errorData = await response.json();
        console.error(errorData);
        mostrarMensaje("Error al registrar la categoría", "danger");
      }
    } catch (error) {
      console.error(error);
      mostrarMensaje("Error de conexión con el servidor", "danger");
    }
  });

function mostrarMensaje(mensaje, tipo) {
  const div = document.getElementById("mensaje");
  div.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensaje}</div>`;
}
