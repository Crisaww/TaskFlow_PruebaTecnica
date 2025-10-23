// ==============================
// URLs de la API
// ==============================
const urlTareas = "http://127.0.0.1:8000/TaskFlow/api/v1/task/";
const urlCategorias = "http://127.0.0.1:8000/TaskFlow/api/v1/category/";
const urlEstados = "http://127.0.0.1:8000/TaskFlow/api/v1/status/";

const token = localStorage.getItem("access");

// ==============================
// Inicialización al cargar la página
// ==============================
$(document).ready(function () {
  if (!token) {
    Swal.fire("No autorizado", "Debes iniciar sesión.", "warning").then(() => {
      window.location.href = "Login.html";
    });
    return;
  }

  // Cargar selects
  cargarCategorias("#filtroCategoria");
  cargarEstados("#filtroEstado");

  // Listar tareas inicialmente
  listarTareas();

  // Filtrar tareas
  $("#btnFiltrar").click(function () {
    const categoriaId = $("#filtroCategoria").val();
    const estadoId = $("#filtroEstado").val();
    listarTareas(categoriaId, estadoId);
  });

  // Formulario de edición
  $("#formEditarTarea").on("submit", function (e) {
    e.preventDefault();
    actualizarTarea();
  });
});

// ==============================
// Función para cargar categorías en un select
// ==============================
function cargarCategorias(selectId) {
  $.ajax({
    url: urlCategorias,
    type: "GET",
    headers: { Authorization: `Bearer ${token}` },
    success: function (data) {
      const select = $(selectId);
      select.empty().append('<option value="">Todas las categorías</option>');
      data.forEach((c) =>
        select.append(`<option value="${c.id}">${c.name}</option>`)
      );
    },
    error: function (xhr) {
      Swal.fire("Error", "No se pudieron cargar las categorías", "error");
      console.error(xhr);
    },
  });
}

// ==============================
// Función para cargar estados en un select
// ==============================
function cargarEstados(selectId) {
  $.ajax({
    url: urlEstados,
    type: "GET",
    headers: { Authorization: `Bearer ${token}` },
    success: function (data) {
      const select = $(selectId);
      select.empty().append('<option value="">Todos los estados</option>');
      data.forEach((s) =>
        select.append(`<option value="${s.id}">${s.name}</option>`)
      );
    },
    error: function (xhr) {
      Swal.fire("Error", "No se pudieron cargar los estados", "error");
      console.error(xhr);
    },
  });
}

// ==============================
// Función para listar tareas con botones de acción
// ==============================
function listarTareas(categoriaId = "", estadoId = "") {
  let url = urlTareas;
  const params = [];
  if (categoriaId) params.push(`category_id=${categoriaId}`);
  if (estadoId) params.push(`status_id=${estadoId}`);
  if (params.length) url += `?${params.join("&")}`;

  const tbody = document.getElementById("tablaTareas");
  tbody.innerHTML = `
    <tr>
      <td colspan="7" class="text-center">
        <div class="d-flex justify-content-center align-items-center gap-2">
          <div class="spinner-border text-primary" role="status"></div>
          <span>Cargando tareas...</span>
        </div>
      </td>
    </tr>
  `;

  $.ajax({
    url: url,
    type: "GET",
    headers: { Authorization: `Bearer ${token}` },
    success: function (data) {
      tbody.innerHTML = "";

      if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center">No hay tareas</td></tr>`;
        return;
      }

      data.forEach((task) => {
        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.innerText = task.id;

        let tdTitle = document.createElement("td");
        tdTitle.innerText = task.title;

        let tdDesc = document.createElement("td");
        tdDesc.innerText = task.description;

        let tdCat = document.createElement("td");
        tdCat.innerText = task.category ? task.category.name : "Sin categoría";

        let tdStatus = document.createElement("td");
        tdStatus.innerText = task.status ? task.status.name : "Sin estado";

        let tdCreated = document.createElement("td");
        tdCreated.innerText = new Date(task.created_at).toLocaleString();

        let tdAcciones = document.createElement("td");

        // Botón editar
        let btnEditar = document.createElement("button");
        btnEditar.className = "btn btn-warning btn-sm me-2";
        btnEditar.innerHTML = "<i class='fas fa-edit'></i> Editar";
        btnEditar.onclick = function () {
          editarTarea(task.id);
        };

        // Botón eliminar
        let btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-danger btn-sm";
        btnEliminar.innerHTML = "<i class='fa-solid fa-trash'></i> Eliminar";
        btnEliminar.onclick = function () {
          eliminarTarea(task.id);
        };

        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnEliminar);

        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDesc);
        tr.appendChild(tdCat);
        tr.appendChild(tdStatus);
        tr.appendChild(tdCreated);
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);
      });
    },
    error: function (xhr) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center">Error al cargar las tareas</td></tr>`;
      console.error(xhr);
    },
  });
}

// ==============================
// Consultar tarea por ID y abrir modal para editar
// ==============================
function editarTarea(id) {
  $.ajax({
    url: `${urlTareas}${id}/`,
    type: "GET",
    headers: { Authorization: `Bearer ${token}` },
    success: function (data) {
      $("#tareaId").val(data.id);
      $("#editarTitle").val(data.title);
      $("#editarDescription").val(data.description);

      // Cargar categorías y seleccionar la actual
      $.ajax({
        url: urlCategorias,
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (categorias) {
          const select = $("#editarCategory");
          select.empty();
          select.append('<option value="">Selecciona una categoría</option>');
          categorias.forEach((c) => {
            select.append(
              `<option value="${c.id}" ${
                data.category && data.category.id === c.id ? "selected" : ""
              }>${c.name}</option>`
            );
          });
        },
      });

      // Cargar estados y seleccionar el actual
      $.ajax({
        url: urlEstados,
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (estados) {
          const select = $("#editarStatus");
          select.empty();
          select.append('<option value="">Selecciona un estado</option>');
          estados.forEach((s) => {
            select.append(
              `<option value="${s.id}" ${
                data.status && data.status.id === s.id ? "selected" : ""
              }>${s.name}</option>`
            );
          });
        },
      });

      $("#modalEditarTarea").modal("show");
    },
    error: function () {
      Swal.fire("Error", "No se pudo cargar la tarea", "error");
    },
  });
}

// ==============================
// Actualizar tarea
// ==============================
function actualizarTarea() {
  const id = $("#tareaId").val();
  const title = $("#editarTitle").val().trim();
  const description = $("#editarDescription").val().trim();
  const category = $("#editarCategory").val();
  const status = $("#editarStatus").val();

  if (!title || !category || !status) {
    Swal.fire("Error", "Complete todos los campos correctamente", "error");
    return;
  }

  const formData = {
    title: title,
    description: description,
    category_id: parseInt(category),
    status_id: parseInt(status),
  };

  $.ajax({
    url: `${urlTareas}${id}/`,
    type: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(formData),
    success: function () {
      Swal.fire(
        "Actualizado",
        "La tarea se actualizó correctamente",
        "success"
      );
      $("#modalEditarTarea").modal("hide");
      listarTareas();
    },
    error: function () {
      Swal.fire("Error", "No se pudo actualizar la tarea", "error");
    },
  });
}

// ==============================
// Eliminar tarea
// ==============================
function eliminarTarea(id) {
  Swal.fire({
    title: "¿Eliminar tarea?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `${urlTareas}${id}/`,
        type: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        success: function () {
          Swal.fire("Eliminado", "La tarea ha sido eliminada", "success");
          listarTareas();
        },
        error: function () {
          Swal.fire("Error", "No se pudo eliminar la tarea", "error");
        },
      });
    }
  });
}
