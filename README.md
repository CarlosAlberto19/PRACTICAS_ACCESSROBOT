# Basic Express Authentication API

Esta es una API de ejemplo construida con Vue3.js y se utiliza **Node.js** y **Express** que implementa rutas básicas de autenticación (registro, login, etc.) usando un array en memoria para almacenar los usuarios. Es ideal para fines educativos y para entender cómo se configuran rutas, se manejan peticiones HTTP y se prueban endpoints con Postman.

> **Nota:**  
> Los datos se almacenan en memoria, por lo que se perderán al reiniciar el servidor. Para un proyecto en producción se recomienda usar una base de datos real.

---

## Requisitos

- [Node.js](https://nodejs.org/) (versión 12 o superior)
- [npm](https://www.npmjs.com/) (se instala automáticamente con Node.js)

---

## Instalación y Configuración

### 1. Clonar el Repositorio

Abre tu terminal y ejecuta:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
2. Instalar Dependencias
Dentro de la carpeta clonada, instala las dependencias:

bash
Copiar
npm install
Este proyecto utiliza principalmente:

express: Framework para crear el servidor.
cors: Middleware para habilitar solicitudes CORS.
Otras dependencias instaladas (opcional para futuras mejoras):

nodemon: Para desarrollo (reinicia el servidor automáticamente).
bcryptjs: Para encriptar contraseñas.
mongoose: Para conectar con MongoDB.
dotenv: Para manejar variables de entorno.
jsonwebtoken: Para implementar autenticación basada en tokens.
3. Arrancar el Servidor
Para iniciar el servidor, ejecuta:

bash
Copiar
node server.js
Deberías ver en la terminal un mensaje similar a:

nginx
Copiar
Servidor corriendo en http://localhost:5000
Uso y Endpoints
Endpoints de Autenticación
Registrar Usuario
URL: POST /api/auth/register

Descripción: Registra un nuevo usuario.

Body (JSON):

json
Copiar
{
  "email": "usuario@example.com",
  "password": "123456"
}
Respuestas:

Éxito (201):
json
Copiar
{
  "message": "Usuario registrado con éxito"
}
Error (400 - Usuario duplicado):
json
Copiar
{
  "message": "Usuario ya registrado"
}
Inicio de Sesión (Login)
URL: POST /api/auth/login

Descripción: Inicia sesión con un usuario registrado.

Body (JSON):

json
Copiar
{
  "email": "usuario@example.com",
  "password": "123456"
}
Respuesta Esperada:

Éxito:
json
Copiar
{
  "message": "Inicio de sesión exitoso"
}
Error: Si el usuario no existe o la contraseña es incorrecta, se devuelve un mensaje de error.
Endpoints Adicionales (Opcionales)
Obtener Todos los Usuarios
URL: GET /api/auth/users
Descripción: Devuelve un array con todos los usuarios registrados.
Obtener un Usuario por Email
URL: GET /api/auth/user/:email
Descripción: Devuelve los datos de un usuario específico filtrado por email.
Eliminar un Usuario por Email
URL: DELETE /api/auth/user/:email
Descripción: Elimina el usuario cuyo email se especifique.
Pruebas con Postman
Para probar la API con Postman:

Registro de Usuario:

Método: POST
URL: http://localhost:5000/api/auth/register
Body: Selecciona raw y JSON, luego ingresa:
json
Copiar
{
  "email": "usuario@example.com",
  "password": "123456"
}
Inicio de Sesión:

Método: POST
URL: http://localhost:5000/api/auth/login
Body: Selecciona raw y JSON, luego ingresa:
json
Copiar
{
  "email": "usuario@example.com",
  "password": "123456"
}
Listar Todos los Usuarios:

Método: GET
URL: http://localhost:5000/api/auth/users
Obtener un Usuario Específico:

Método: GET
URL: http://localhost:5000/api/auth/user/usuario@example.com
Eliminar un Usuario:

Método: DELETE
URL: http://localhost:5000/api/auth/user/usuario@example.com
Estructura del Proyecto
bash
Copiar
tu_repositorio/
│
├─ server.js         # Archivo principal que configura el servidor y las rutas
├─ package.json      # Configuración de npm y dependencias
└─ node_modules/     # Dependencias instaladas
Notas Adicionales
Persistencia de Datos:
Los usuarios se almacenan en un array en memoria, por lo que se perderán al reiniciar el servidor. Para persistir datos, integra una base de datos (por ejemplo, MongoDB).

Mejoras Futuras:

Añadir validaciones de entrada.
Implementar autenticación con JWT.
Conectar a una base de datos real.
Instrucciones para Usuarios
Si vas a compartir este proyecto, indica a los usuarios que:

Clonen el repositorio.
Ejecuten npm install para instalar las dependencias.
Arranquen el servidor con node server.js.
Prueben los endpoints usando Postman siguiendo las instrucciones de esta guía.
