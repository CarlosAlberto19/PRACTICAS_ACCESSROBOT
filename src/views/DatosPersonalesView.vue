<template>
  <div class="contenedor-pagina">
    <div class="caja-formulario">
      <!-- 📌 CABECERA DENTRO DEL FORMULARIO -->
      <div class="cabecera">
        <h1 class="titulo">Access Robot</h1>
        <img src="@/assets/images/ARturo.png" alt="Robot" class="imagen-robot" />
      </div>

      <h2 class="subtitulo">Crear nueva cuenta</h2>

      <div class="contenedor-inputs">
        <div class="grupo-input">
          <label for="correo">Email</label>
          <input id="correo" type="email" placeholder="Introduce tu email" />
        </div>

        <div class="grupo-input">
          <label for="clave">Contraseña</label>
          <div class="envoltorio-clave">
            <input id="clave" type="password" placeholder="Crea una contraseña" />
            <span class="icono material-icons" @click="togglePassword">visibility</span>
          </div>
        </div>
      </div>
    </div> <!-- 🔹 Cierre de .caja-formulario -->
  </div> <!-- 🔹 Cierre de .contenedor-pagina -->
</template>

<script>
export default {
  name: 'DatosPersonalesView',
  methods: {
    togglePassword() {
      const claveInput = document.getElementById("clave");
      claveInput.type = claveInput.type === "password" ? "text" : "password";
    }
  }
};
</script>
