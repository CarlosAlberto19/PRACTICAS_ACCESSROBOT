const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Aquí guardaremos los usuarios en un array (en memoria)
let users = [];

// Ruta de prueba para la raíz
app.get('/', (req, res) => {
  res.send('¡Hola! El servidor está corriendo correctamente.');
});

// 1) RUTA DE REGISTRO
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;

  // Verificar si ya existe un usuario con ese email
  const existeUsuario = users.find(u => u.email === email);
  if (existeUsuario) {
    return res.status(400).json({ message: 'Usuario ya registrado' });
  }

  // Guardar el usuario en el array
  users.push({ email, password });
  return res.status(201).json({ message: 'Usuario registrado con éxito' });
});

// 2) RUTA DE LOGIN
app.post('/api/auth/login', (req, res) => {
  console.log('Ruta de login llamada');
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const usuario = users.find(u => u.email === email);
  if (!usuario) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  // Verificar la contraseña
  if (usuario.password !== password) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  // Login exitoso
  return res.json({ message: 'Inicio de sesión exitoso' });
});

// 3) RUTA PARA LISTAR TODOS LOS USUARIOS (GET)
app.get('/api/auth/users', (req, res) => {
  // Simplemente devolvemos el array completo de usuarios
  return res.json(users);
});

// 4) RUTA PARA OBTENER UN USUARIO POR EMAIL (GET)
app.get('/api/auth/user/:email', (req, res) => {
  const { email } = req.params;
  const usuario = users.find(u => u.email === email);

  if (!usuario) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  return res.json(usuario);
});

// 5) RUTA PARA ELIMINAR UN USUARIO POR EMAIL (DELETE)
app.delete('/api/auth/user/:email', (req, res) => {
  const { email } = req.params;
  const index = users.findIndex(u => u.email === email);

  if (index === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Eliminar el usuario del array
  users.splice(index, 1);
  return res.json({ message: `Usuario con email ${email} eliminado.` });
});

// Arrancar el servidor en el puerto 5000
app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
