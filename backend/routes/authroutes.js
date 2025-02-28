const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// 📌 REGISTRO DE USUARIOS
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;  // Datos del body

    // 1) Verificar si el usuario ya existe
    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    // 2) Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3) Guardar usuario en la BD
    const nuevoUsuario = new User({ email, password: hashedPassword });
    await nuevoUsuario.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);  // <-- Muestra el error real en la consola
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// 📌 INICIO DE SESIÓN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;  // Datos del body

    // 1) Verificar si el usuario existe
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // 2) Comparar la contraseña hasheada
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 3) Generar token JWT
    const token = jwt.sign(
      { id: usuario._id },             // Payload
      process.env.JWT_SECRET,          // Clave secreta de tu .env
      { expiresIn: "1h" }             // Opciones (expira en 1 hora)
    );

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
