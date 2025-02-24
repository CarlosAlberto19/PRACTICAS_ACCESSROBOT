<template>
  <div class="contenedor-pagina">
    <div class="caja-formulario">
      <!-- CABECERA -->
      <div class="cabecera">
        <h1 class="titulo">Iniciar Sesión</h1>
        <img src="@/assets/images/ARturo.png" alt="Robot" class="imagen-robot" />
      </div>

      <h2 class="subtitulo negrita">Introduce tus credenciales</h2>

      <!-- FORMULARIO -->
      <form @submit.prevent="validarLogin">
        <!-- EMAIL -->
        <div class="grupo-campo">
          <!-- PruebaInput genera su propio label interno, 
               así no duplicas contenedores -->
          <PruebaInput
            label_input="Email"
            placeholder="Introduce tu email"
            type="text"
            v-model="email"
            @input="validarEmail"
            class="input-estilizado"
            :class="{
              'error-borde': errorEmail !== '',
              'borde-iluminado': emailFocus
            }"
            @focus="emailFocus = true"
            @blur="emailFocus = false"
          />

          <!-- Check verde (si email es válido) -->
          <span v-if="emailValido" class="icono-check">✔</span>

          <!-- Mensaje de error (si existe) -->
          <p v-if="errorEmail" class="mensaje-error">❌ {{ errorEmail }}</p>
        </div>

        <!-- CONTRASEÑA -->
        <div class="grupo-campo">
          <PruebaInput
            label_input="Contraseña"
            placeholder="Introduce tu contraseña"
            type="password"
            v-model="password"
            @input="validarPassword"
            class="input-estilizado"
            :class="{
              'error-borde': errorPassword !== '',
              'borde-iluminado': passwordFocus
            }"
            @focus="passwordFocus = true"
            @blur="passwordFocus = false"
          />

          <!-- Check verde (si password es válida) -->
          <span v-if="passwordValida" class="icono-check">✔</span>

          <!-- Mensaje de error -->
          <p v-if="errorPassword" class="mensaje-error">❌ {{ errorPassword }}</p>
        </div>

        <!-- Botón Entrar -->
        <PrimaryButton
          class="boton-enviar"
          label="Entrar"
          type="submit"
          :disabled="botonDeshabilitado"
        />

        <!-- "¿Has olvidado tu contraseña?" -->
        <p class="texto-olvido" @click="irARecuperarContrasena">
          <strong>¿Has olvidado tu contraseña?</strong>
        </p>

        <hr class="linea-separadora" />

        <p class="texto-centrado">¿No tienes cuenta?</p>
        <SecondaryButton
          label="Ir a Crear nueva cuenta"
          type="button"
          @click="irACrearCuenta"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import PrimaryButton from "@/components/PrimaryButton.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";
import PruebaInput from "@/components/PruebaInput.vue";

const router = useRouter();

// =============================
// Variables reactivas
// =============================
const email = ref("");
const password = ref("");
const emailFocus = ref(false);
const passwordFocus = ref(false);

// Errores como strings (cadena vacía => sin error)
const errorEmail = ref("");
const errorPassword = ref("");

// =============================
// Validar Email (similar a "recuperarclave")
// =============================
function validarEmail() {
  // Elimina espacios
  email.value = email.value.replace(/\s+/g, "");

  // 1) Vacío
  if (!email.value) {
    errorEmail.value = "El email no puede estar vacío.";
    return;
  }
  // 2) Verifica un solo '@'
  if ((email.value.match(/@/g) || []).length > 1) {
    errorEmail.value = 'El email solo puede contener un "@"';
    return;
  }
  // 3) Debe tener '@'
  if (!email.value.includes("@")) {
    errorEmail.value = 'El email debe contener "@"';
    return;
  }
  // 4) Debe tener '.'
  if (!email.value.includes(".")) {
    errorEmail.value = 'El email debe contener "." después de "@"';
    return;
  }
  // 5) Máximo 50 caracteres
  if (email.value.length > 50) {
    errorEmail.value = "El email no puede superar los 50 caracteres.";
    return;
  }

  // 6) Regex general
  const reEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!reEmail.test(email.value)) {
    errorEmail.value = "Introduce un email válido (ejemplo: usuario@gmail.com)";
    return;
  }

  // Sin error
  errorEmail.value = "";
}

// Computed: emailValido => TRUE si no hay error y no está vacío
const emailValido = computed(() => errorEmail.value === "" && email.value !== "");

// =============================
// Validar Password
// =============================
function validarPassword() {
  // 1) Vacía
  if (!password.value) {
    errorPassword.value = "La contraseña no puede estar vacía.";
    return;
  }
  // 2) 8-16 chars
  if (password.value.length < 8 || password.value.length > 16) {
    errorPassword.value = "Debe tener entre 8 y 16 caracteres.";
    return;
  }
  // 3) Mayus y minus
  if (!/[a-z]/.test(password.value) || !/[A-Z]/.test(password.value)) {
    errorPassword.value = "Debe incluir mayúsculas y minúsculas.";
    return;
  }
  // 4) Debe tener un número
  if (!/\d/.test(password.value)) {
    errorPassword.value = "Debe contener al menos un número.";
    return;
  }
  // 5) Sin espacios
  if (/\s/.test(password.value)) {
    errorPassword.value = "No se permiten espacios en la contraseña.";
    return;
  }
  // 6) Solo [a-zA-Z0-9!@#$%^&*]
  if (/[^a-zA-Z0-9!@#$%^&*]/.test(password.value)) {
    errorPassword.value = "No se permiten caracteres especiales extraños.";
    return;
  }

  // Sin error
  errorPassword.value = "";
}

// Computed: passwordValida => TRUE si no hay error
const passwordValida = computed(() => errorPassword.value === "" && password.value !== "");

// =============================
// Botón Deshabilitado
// =============================
const botonDeshabilitado = computed(() => {
  return errorEmail.value !== "" || errorPassword.value !== "";
});

// =============================
// Función para login
// =============================
function validarLogin() {
  // Dispara validaciones
  validarEmail();
  validarPassword();

  // Si hay errores => no pasar
  if (errorEmail.value || errorPassword.value) {
    return;
  }

  // Si OK, redirige (ejemplo) al home
  router.push("/");
}

// =============================
// Navegación
// =============================
function irACrearCuenta() {
  router.push("/crear-cuenta");
}
function irARecuperarContrasena() {
  router.push("/recuperar-clave");
}
</script>

<style scoped>
.contenedor-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  width: 100%;
  background-color: #f8f9fa;
}

.caja-formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-width: 500px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.subtitulo {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
}

.imagen-robot {
  width: 120px;
  height: auto;
  margin: 15px auto;
  display: block;
}

/* Contenedor de cada campo (para posicionar el check, etc.) */
.grupo-campo {
  margin-bottom: 20px;
  position: relative;
}

/* Check verde (posicionado en la esquina derecha del input) */
.icono-check {
  position: absolute;
  right: 5px;
  top: 48px; /* Ajusta según tu input */
  font-size: 16px;
  color: green;
}

/* Borde rojo para error */
.error-borde {
  border-color: red !important;
  box-shadow: 0 0 8px rgba(255, 0, 0, 0.6);
}

/* Borde focus color morado */
.borde-iluminado {
  border-color: #7A40E0 !important;
  box-shadow: 0 0 8px rgba(122, 64, 224, 0.6);
}

/* Mensaje de error */
.mensaje-error {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

/* Barra separadora */
.linea-separadora {
  margin: 20px auto;
  width: 80%;
  border: 0;
  border-top: 3px solid #ccc;
}

/* Texto centrado */
.texto-centrado {
  text-align: center;
}

.texto-olvido {
  text-decoration: underline;
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
}
</style>
