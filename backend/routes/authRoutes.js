const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 📌 REGISTRO DE USUARIOS
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Verificar si el usuario ya existe
    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) return res.status(400).json({ message: "Usuario ya registrado" });

    // ✅ Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Guardar usuario
    const nuevoUsuario = new User({ email, password: hashedPassword });
    await nuevoUsuario.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// 📌 INICIO DE SESIÓN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Verificar si el usuario existe
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

    // ✅ Comparar la contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) return res.status(401).json({ message: "Contraseña incorrecta" });

    // ✅ Generar token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
