// URLs de la API
const urlCategorias = "http://127.0.0.1:8000/TaskFlow/api/v1/category/";
const urlEstados = "http://127.0.0.1:8000/TaskFlow/api/v1/status/";
const urlTareas = "http://127.0.0.1:8000/TaskFlow/api/v1/task/";

// Obtener token JWT desde localStorage
const token = localStorage.getItem("access");

// ------------------------
// Al cargar el DOM
// ------------------------
$(document).ready(function () {
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

  cargarCategorias();
  cargarEstados();
});

// ------------------------
// Cargar categorías desde el backend
// ------------------------
function cargarCategorias() {
  $("#loader").show();

  $.ajax({
    url: urlCategorias,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function (categorias) {
      let select = $("#category");
      select.empty();
      select.append('<option value="">Selecciona una categoría</option>');
      categorias.forEach((cat) => {
        select.append(`<option value="${cat.id}">${cat.name}</option>`);
      });
      $("#loader").hide();
    },
    error: function (xhr) {
      $("#loader").hide();
      if (xhr.status === 401) {
        Swal.fire("Error", "No autorizado. Inicia sesión nuevamente.", "error");
      } else {
        Swal.fire("Error", "No se pudieron cargar las categorías", "error");
      }
    },
  });
}

// ------------------------
// Cargar estados desde el backend
// ------------------------
function cargarEstados() {
  $.ajax({
    url: urlEstados,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function (estados) {
      let select = $("#status");
      select.empty();
      select.append('<option value="">Selecciona un estado</option>');
      estados.forEach((e) => {
        select.append(`<option value="${e.id}">${e.name}</option>`);
      });
    },
    error: function (xhr) {
      if (xhr.status === 401) {
        Swal.fire("Error", "No autorizado. Inicia sesión nuevamente.", "error");
      } else {
        Swal.fire("Error", "No se pudieron cargar los estados", "error");
      }
    },
  });
}

// ------------------------
// Registrar nueva tarea
// ------------------------
function RegistrarTarea() {
  let title = $("#title").val().trim();
  let description = $("#description").val().trim();
  let category = $("#category").val();
  let status = $("#status").val();

  if (!validarCampos(title, category, status)) {
    Swal.fire({
      title: "Error!",
      text: "Complete todos los campos correctamente",
      icon: "error",
    });
    return;
  }

  let formData = {
    title: title,
    description: description,
    category_id: parseInt(category),
    status_id: parseInt(status),
  };

  $.ajax({
    url: urlTareas,
    type: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(formData),
    success: function () {
      Swal.fire({
        title: "Excelente",
        text: "La tarea se registró correctamente",
        icon: "success",
      });
      $("#formTarea")[0].reset();
    },
    error: function (xhr) {
      if (xhr.status === 401) {
        Swal.fire("Error", "No autorizado. Inicia sesión nuevamente.", "error");
      } else {
        Swal.fire("Error", "No se pudo registrar la tarea", "error");
      }
    },
  });
}

// ------------------------
// Validar campos
// ------------------------
function validarCampos(title, category, status) {
  return title !== "" && category !== "" && status !== "";
}

// ------------------------
// Escuchar el submit del formulario
// ------------------------
$("#formTarea").on("submit", function (e) {
  e.preventDefault();
  RegistrarTarea();
});
