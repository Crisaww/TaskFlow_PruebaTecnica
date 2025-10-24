# TaskFlow - Django Rest Framework (API RestFull)

## Descripción

Este proyecto implementa un sistema **Gestor de tareas**, permitiendo crear, consultar, actualizar y eliminar tareas mediante una **API RESTful** desarrollada con **Django REST Framework**. El frontend está construido utilizando **HTML, CSS, Bootstrap 5 y JavaScript**, proporcionando una interfaz simple, intuitiva y responsiva.

La API de TaskFlow sigue la arquitectura MVC adaptada al patrón MTV de Django, organizando el proyecto en modelos, vistas y controladores para mantener un código limpio y fácil de mantener.

El objetivo del proyecto o prueba es demostrar la integración de un backend robusto aplicando buenas prácticas de desarrollo y arquitectura modular.

## Herramientas utilizadas

- **Visual Studio Code (VS Code):** Editor de código recomendado por su integración con Python y Git.
- **Thunder Client (o Postman):** Para realizar pruebas a los endpoints de la API.
- **GitHub:** Almacenamiento y control de versiones del proyecto.
- **Navegador web (Google Chrome, Firefox, Edge, etc.):** Para probar las vistas HTML y ejecutar las peticiones desde el frontend.

## Backend

- **Lenguaje:** Python 3.10.0 = Lenguaje requerido para el desarrollo (No opté por una versión mas reciente ya que pueden estar en proceso de mejora y eso afectaria al desarrollo).
- **Framework:** Django 5.2.7 = Framework requerido con una version estable que se adapta al lenguaje.

## Frontend

Ocupé estos lenguajes ya que mantiene la interfaz ligera y responsiva sin necesidad de frameworks complejos, permitiendo un desarrollo más rápido y directo.

- HTML5, CSS3, Bootstrap 5.
- JavaScript (nativo).

## Base de datos

- SQLite (para desarrollo) = Base de datos fácil y rapida de configurar para desarrollo local.

## Extensiones y librerías incluidas en el entorno

Estas librerias ayudan a que el frontend y el backend se comuniquen sin problemas, hacen que la experiencia del usuario sea más agradable y permiten filtrar o validar la información de una forma más eficaz.

- asgiref==3.10.0
- certifi==2025.10.5
- charset-normalizer==3.4.4
- coreapi==2.3.3
- coreschema==0.0.4
- idna==3.11
- itypes==1.2.0
- Jinja2==3.1.6
- MarkupSafe==3.0.3
- PyJWT==2.10.1
- requests==2.32.5
- sqlparse==0.5.3
- typing_extensions==4.15.0
- tzdata==2025.2
- uritemplate==4.2.0
- urllib3==2.5.0

## Instrucciones de Instalación y Ejecución

1.  **Clonar el repositorio**

    1. git clone https://github.com/Crisaww/TaskFlow_PruebaTecnica.git

2.  **Crear y activar el Entorno Virtual**

    1. cd back-end
    2. python -m venv venv
    3. venv\Scripts\activate

3.  **Instalar dependencias**

    1. pip install -r requirements.txt

4.  **Aplicar migraciones de la base de datos**

    1. python manage.py migrate

5.  **Crear un superusuario (Opcional)**

    1. python manage.py createsuperuser

    Este rol es el encargado de:

    - ver, crear, editar o eliminar registros de cualquier modelo (usuarios, tareas, categorías, etc.).
    - Gestionar permisos y grupos de otros usuarios.
    - Supervisar toda la base de datos de manera gráfica.

6.  **Ejecutar el servidor local**

    1. python manage.py runserver
    2. Clic en el enlace http://127.0.0.1:8000/

7.  **Ejemplos de uso**

    - **USER:**

    1. Registro de un usuario (POST) = http://127.0.0.1:8000/TaskFlow/api/v1/registro/

    - Petición (JSON):

      {
      "username": "Eloisa",
      "email": "eloisa@gmail.com",
      "password": "12345678"
      }

    - Respuesta esperada (JSON):

      {
      "refresh": "<token_refresh>",
      "access": "<token_access>"
      }

    2. Login de un usuario (POST) = http://127.0.0.1:8000/TaskFlow/api/token/

    - Petición (JSON):

      {
      "username": "Eloisa",
      "password": "12345678"
      }

    - Respuesta esperada (JSON):

      {
      "refresh": "<token_refresh>",
      "access": "<token_access>"
      }

    - **CATEGORY:**

    1. Crear una categoria (POST) = http://127.0.0.1:8000/TaskFlow/api/category/

    - Petición (JSON):

      {
      "name": "Musica"
      }

    - Respuesta esperada (JSON):

      {
      "id": 2,
      "name": "Musica",
      "owner": {
      "id": 1,
      "username": "Eloisa",
      "email": "eloisa@gmail.com"
      }
      }

    2. Obtener todas las categorias (GET) = http://127.0.0.1:8000/TaskFlow/api/category/

    - Respuesta esperada (JSON):
      [
      {
      "id": 1,
      "name": "Estudio",
      "owner": {
      "id": 1,
      "username": "Eloisa",
      "email": "eloisa@gmail.com"
      }
      },
      {
      "id": 2,
      "name": "Música",
      "owner": {
      "id": 1,
      "username": "Eloisa",
      "email": "eloisa@gmail.com"
      }
      }
      ]

    3. Actualizar una categoria (PATCH) = http://127.0.0.1:8000/TaskFlow/api/category/1/

    - Petición (JSON):

      {
      "name": "Música y Folclor"
      }

    - Respuesta esperada (JSON):

      {
      "id": 2,
      "name": "Música y Folclor",
      "owner": {
      "id": 1,
      "username": "Eloisa",
      "email": "eloisa@gmail.com"
      }
      }

    4. Eliminar una categoria (DELETE) = http://127.0.0.1:8000/TaskFlow/api/category/1/

    - Respuesta esperada (JSON):

      {
      "message": "Categoría eliminada con éxito."
      }

    - **STATUS:**

    1. Crear un estado (POST) = http://127.0.0.1:8000/TaskFlow/api/status/

       - Petición (JSON):

         {
         "name": "Cancelada"
         }

       - Respuesta esperada (JSON):

         {
         "id": 4,
         "name": "Cancelada"
         }

    2. Obtener todos los estados (GET) = http://127.0.0.1:8000/TaskFlow/api/status/

    - Respuesta esperada (JSON):
      [
      {
      "id": 1,
      "name": "Pendiente"
      },
      {
      "id": 2,
      "name": "En progreso"
      },
      {
      "id": 3,
      "name": "Completada"
      },
      {
      "id": 4,
      "name": "Cancelada"
      }
      ]

    3. Actualizar un estado (PATCH) = http://127.0.0.1:8000/TaskFlow/api/status/1/

    - Petición (JSON):

      {
      "name": "En espera"
      }

    - Respuesta esperada (JSON):

      [
      {
      "id": 1,
      "name": "En espera"
      },
      {
      "id": 2,
      "name": "En progreso"
      },
      {
      "id": 3,
      "name": "Completada"
      },
      {
      "id": 4,
      "name": "Cancelada"
      }
      ]

    4. Eliminar un estado (DELETE) = http://127.0.0.1:8000/TaskFlow/api/status/1/

    - Respuesta esperada (JSON):

      {
      "message": "Estado eliminado con éxito."
      }

    - **TASK:**

    1. Crear una tarea (POST) = http://127.0.0.1:8000/TaskFlow/api/task/

       - Petición (JSON):

         {
         "status": 3,
         "category": 17,
         "title": "La Danza",
         "description": "¿Para que sirve Danzar?"
         }

       - Respuesta esperada (JSON):

         {
         "id": 1,
         "title": "La Danza",
         "description": "¿Para que sirve Danzar?",
         "owner": {
         "id": 1,
         "username": "Eloisa",
         "email": "eloisa@gmail.com"
         },
         "category": {
         "id": 17,
         "name": "Musica",
         "owner": {
         "id": 1,
         "username": "Eloisa",
         "email": "eloisa@gmail.com"
         }
         },
         "status": {
         "id": 4,
         "name": "Cancelada"
         },
         "created_at": "2025-10-24T02:04:26.119563Z",
         "updated_at": "2025-10-24T02:04:26.119563Z"
         }

    2. Obtener todas los tareas (GET) = http://127.0.0.1:8000/TaskFlow/api/task/

    - Respuesta esperada (JSON):
      [
      {
      "id": 1,
      "title": "La Danza",
      "description": "¿Para que sirve Danzar?",
      "owner": {
      "id": 1,
      "username": "Eloisa",
      "email": "eloisa@gmail.com"
      },
      "category": {
      "id": 17,
      "name": "Musica",
      "owner": {
      "id": 1,
      "username": "Eloisa",
      "email": "eloisa@gmail.com"
      }
      },
      "status": {
      "id": 4,
      "name": "Cancelada"
      },
      "created_at": "2025-10-24T02:04:26.119563Z",
      "updated_at": "2025-10-24T02:04:26.119563Z"
      },
      {
      "id": 2,
      "title": "El dembow",
      "description": "¿Cual es el origen del Dembow?",
      "owner": {
      "id": 1,
      "username": "Eloisa",
      "email": "eloisa@gmail.com"
      },
      "category": {
      "id": 17,
      "name": "Musica",
      "owner": {
      "id": 1,
      "username": "Eloisa",
      "email": "eloisa@gmail.com"
      }
      },
      "status": {
      "id": 3,
      "name": "Completada"
      },
      "created_at": "2025-10-24T02:04:26.119563Z",
      "updated_at": "2025-10-24T02:04:26.119563Z"
      }
      ]

    3. Actualizar una tarea (PATCH) = http://127.0.0.1:8000/TaskFlow/api/task/1/

    - Petición (JSON):

      {
      "status": 2,
      "category": 2,
      "title": "La Mudanza",
      "description": "Cancion que catapultó a BadBunny"
      }

    - Respuesta esperada (JSON):

      {
      "id": 1,
      "title": "La Mudanza",
      "description": "Cancion que catapultó a BadBunny",
      "owner": {
      "id": 1,
      "username": "Eloisa",
      "email": "eloisa@gmail.com"
      },
      "category": {
      "id": 2,
      "name": "Farandula",
      "owner": {
      "id": 1,
      "username": "Eloisa",
      "email": "eloisa@gmail.com"
      }
      },
      "status": {
      "id": 2,
      "name": "En progreso"
      },
      "created_at": "2025-10-24T02:04:26.119563Z",
      "updated_at": "2025-10-24T02:04:30.119563Z"
      }

    4. Eliminar una tarea (DELETE) = http://127.0.0.1:8000/TaskFlow/api/task/1/

    - Respuesta esperada (JSON):

      {
      "message": "Tarea eliminada con éxito."
      }
