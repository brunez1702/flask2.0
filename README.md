# EfiJS
Descripción
Este proyecto es una aplicación de gestión de usuarios desarrollada con React para el frontend y Flask para el backend
Funcionalidades
 Autenticación de Administrador:
        El sistema permite que un administrador inicie sesión mediante un formulario en React.
        Al autenticarse, el backend en Flask genera un token de autenticación, el cual es almacenado en el frontend para autorizar las siguientes acciones.
 CRUD Completo de Usuarios:
        Crear Usuarios: El administrador puede registrar nuevos usuarios.
        Leer Usuarios: El administrador puede ver una lista de usuarios registrados con información básica (nombre, correo, rol).
        Actualizar Usuarios: Permite editar el nombre de usuario, contraseña y rol (admin o no) de cada usuario.
        Eliminar Usuarios: Los usuarios pueden ser eliminados directamente desde la tabla en el frontend.

    CRUD para un Modelo Específico:
        El administrador puede gestionar registros de un modelo adicional (como "Equipo", "Modelo", "Marca" o "Fabricante") con operaciones de creación, lectura, actualización y eliminación.
Seguridad
   El sistema usa tokens de autenticación para todas las operaciones de CRUD, asegurando que solo un administrador autenticado pueda acceder a estas funcionalidades.
    El token se valida en cada operación y, en caso de expiración, el usuario es informado y redirigido para autenticarse nuevamente.

Tecnologías Utilizadas
Frontend: React.js
    Backend: Flask (Python)
    Autenticación: Basada en tokens con JWT
    Base de Datos: Configurada para almacenar usuarios y datos del modelo seleccionado para el CRUD específico
Ejecución del Proyecto
Para ejecutar el proyecto en tu entorno local, sigue estos pasos:
    Clona los repositorios del frontend y backend.
    Instala las dependencias en cada repositorio:
    npm install  # para el frontend
    pip install -r requirements.txt  # para el backend
Ejecuta el servidor Flask (Backend):
    flask run  # usualmente en http://127.0.0.1:5000
Ejecuta el servidor React (Frontend):
   npm start  # usualmente en http://localhost:3000
   npm start  # usualmente en http://localhost:3000
Controlar los endpoints y puertos para que el frontend pueda comunicarse con el backend.
