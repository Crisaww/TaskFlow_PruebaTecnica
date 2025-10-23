// URL base de la API
const urlCategorias = "http://127.0.0.1:8000/TaskFlow/api/v1/category/";

// === Listar Categorías ===
function listarCategorias() {
  const token = localStorage.getItem("access");
  if (!token) {
    Swal.fire({
      title: "No autorizado",
      text: "Debes iniciar sesión para acceder a esta página.",
      icon: "warning",
    }).then(() => {
      window.location.href = "LoginUsuario.html";
    });
    return;
  }

  let cuerpoTabla = document.getElementById("tablaCategorias");
  cuerpoTabla.innerHTML = `
    <tr>
      <td colspan="3" class="text-center">
        <div class="d-flex justify-content-center align-items-center gap-2">
          <div class="spinner-border text-primary" role="status"></div>
          <span>Cargando categorías...</span>
        </div>
      </td>
    </tr>
  `;

  $.ajax({
    url: urlCategorias,
    type: "GET",
    headers: { Authorization: `Bearer ${token}` },
    success: function (result) {
      cuerpoTabla.innerHTML = "";

      if (result.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="3">No hay categorías registradas</td></tr>`;
        return;
      }

      result.forEach((cat) => {
        let tr = document.createElement("tr");

        // Crear celdas
        let tdId = document.createElement("td");
        let tdNombre = document.createElement("td");
        let tdAcciones = document.createElement("td");

        tdId.innerText = cat.id;
        tdNombre.innerText = cat.name;

        // === Botón Editar ===
        let btnEditar = document.createElement("button");
        btnEditar.className = "btn btn-warning btn-sm me-2";
        btnEditar.innerHTML = "<i class='fas fa-edit'></i> Editar";
        btnEditar.onclick = function () {
          consultarCategoriaID(cat.id);
          $("#modalEditarCategoria").modal("show");
        };

        // === Botón Eliminar ===
        let btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-danger btn-sm";
        btnEliminar.innerHTML = "<i class='fas fa-trash'></i> Eliminar";
        btnEliminar.onclick = function () {
          eliminarCategoria(cat.id);
        };

        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnEliminar);

        tr.appendChild(tdId);
        tr.appendChild(tdNombre);
        tr.appendChild(tdAcciones);

        cuerpoTabla.appendChild(tr);
      });
    },
    error: function () {
      cuerpoTabla.innerHTML = `<tr><td colspan="3">Error al cargar las categorías</td></tr>`;
    },
  });
}

// === Consultar Categoría por ID (para modal de edición) ===
function consultarCategoriaID(id) {
  const token = localStorage.getItem("access");

  $.ajax({
    url: `${urlCategorias}${id}/`,
    type: "GET",
    headers: { Authorization: `Bearer ${token}` },
    success: function (data) {
      document.getElementById("categoriaId").value = data.id;
      document.getElementById("nombreCategoria").value = data.name;
    },
    error: function () {
      Swal.fire("Error", "No se pudo cargar la categoría", "error");
    },
  });
}

// === Actualizar Categoría ===
function actualizarCategoria() {
  const id = $("#categoriaId").val();
  const nuevoNombre = $("#nombreCategoria").val().trim();
  const token = localStorage.getItem("access");

  if (!nuevoNombre) {
    Swal.fire("Error", "El nombre no puede estar vacío", "error");
    return;
  }

  $.ajax({
    url: `${urlCategorias}${id}/`,
    type: "PUT", // Puedes usar PATCH si solo actualizas el nombre
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ name: nuevoNombre }),
    success: function () {
      Swal.fire(
        "Actualizado",
        "Categoría actualizada correctamente",
        "success"
      );
      $("#modalEditarCategoria").modal("hide");
      listarCategorias();
    },
    error: function (xhr) {
      Swal.fire("Error", "No se pudo actualizar la categoría", "error");
      console.error(xhr);
    },
  });
}

// === Eliminar Categoría ===
function eliminarCategoria(id) {
  const token = localStorage.getItem("access");

  Swal.fire({
    title: "¿Eliminar categoría?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `${urlCategorias}${id}/`,
        type: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        success: function () {
          Swal.fire(
            "Eliminado",
            "La categoría ha sido eliminada correctamente",
            "success"
          );
          listarCategorias();
        },
        error: function () {
          Swal.fire("Error", "No se pudo eliminar la categoría", "error");
        },
      });
    }
  });
}

// === Cuando carga la página ===
$(document).ready(function () {
  listarCategorias();

  // Captura el evento de guardar cambios
  $("#formEditarCategoria").on("submit", function (e) {
    e.preventDefault();
    actualizarCategoria();
  });
});
