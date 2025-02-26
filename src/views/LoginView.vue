<template>
  <div class="contenedor-pagina">
    <div class="caja-formulario">
      <!-- CABECERA -->
      <div class="cabecera">
        <h1 class="titulo">Iniciar Sesión</h1>
        <img src="@/assets/images/ARturo.png" alt="Robot" class="imagen-robot" />
      </div>

      <h2 class="subtitulo negrita">Iniciar sesión</h2>

      <!-- FORMULARIO -->
      <form @submit.prevent="validarLogin">
        <!-- EMAIL -->
        <div class="campo">
          <label for="email">Email</label>
          <div class="input-container">
            <PruebaInput 
              id="email" 
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
            <span v-if="emailValido" class="icono-check">✔</span>
          </div>
          <p v-if="errorEmail" class="mensaje-error">❌ {{ errorEmail }}</p>
        </div>

        <!-- CONTRASEÑA -->
        <div class="campo">
          <label for="password">Contraseña</label>
          <div class="input-container">
            <PruebaInput 
              id="password" 
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
          </div>
          <p v-if="errorPassword" class="mensaje-error">❌ {{ errorPassword }}</p>
        </div>

        <!-- Botón Entrar -->
        <PrimaryButton 
          class="boton-enviar" 
          label="Entrar" 
          type="button" 
          :disabled="botonDeshabilitado || enviando"
          @click="validarLogin" 
        />

        <p class="texto-olvido" @click="irARecuperarContrasena">
          <strong>¿Has olvidado tu contraseña?</strong>
        </p>

        <hr class="linea-separadora" />

        <p class="texto-centrado">¿No tienes cuenta?</p>
        <SecondaryButton label="Ir a Crear nueva cuenta" type="button" @click="irACrearCuenta" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import PruebaInput from "@/components/PruebaInput.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";

const router = useRouter();

// =============================
// Variables reactivas
// =============================
const email = ref("");
const password = ref("");
const emailFocus = ref(false);
const passwordFocus = ref(false);
const enviando = ref(false);

// Errores
const errorEmail = ref("");
const errorPassword = ref("");

// =============================
// Validar Email
// =============================
function validarEmail() {
  email.value = email.value.replace(/\s+/g, "");

  if (!email.value) {
    errorEmail.value = "El email no puede estar vacío.";
    return;
  }
  if (!email.value.includes("@") || !email.value.includes(".")) {
    errorEmail.value = 'El email debe contener "@" y "."';
    return;
  }
  const reEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!reEmail.test(email.value)) {
    errorEmail.value = "Introduce un email válido (ej: usuario@gmail.com)";
    return;
  }
  errorEmail.value = "";
}

// Computed para el check ✔
const emailValido = computed(() => errorEmail.value === "" && email.value !== "");

// =============================
// Validar Password
// =============================
function validarPassword() {
  if (!password.value) {
    errorPassword.value = "La contraseña no puede estar vacía.";
    return;
  }
  if (password.value.length < 8) {
    errorPassword.value = "Debe tener al menos 8 caracteres.";
    return;
  }
  errorPassword.value = "";
}

// =============================
// Botón Deshabilitado
// =============================
const botonDeshabilitado = computed(() => {
  return !emailValido.value || errorPassword.value !== "";
});

// =============================
// Función para login
// =============================
async function validarLogin() {
  validarEmail();
  validarPassword();

  if (errorEmail.value || errorPassword.value) {
    return;
  }

  if (enviando.value) return;
  enviando.value = true;

  router.push("/reserva");
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
/* ✅ Manteniendo todos los estilos */
.contenedor-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 150%;
  background-color: #f8f9fa;
  padding: 40px 20px;
}

.caja-formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.subtitulo {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
}

.imagen-robot {
  width: 120px;
  margin: 15px auto;
  display: block;
}

::v-deep(.campo) {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  position: relative;
  font-size: 16px;
  margin-top: 20px;
}

::v-deep(.campo label) {
  font-weight: 600 !important;
  font-size: 18px;
  color: #000;
  margin-bottom: 6px;
}

::v-deep(.input-container) {
  width: 100%;
}

.icono-check {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-10%);
  font-size: 22px;
  color: green;
}

.error-borde {
  border: 2px solid red !important;
  box-shadow: 0 0 8px rgba(255, 0, 0, 0.9) !important;
}

.borde-iluminado {
  border: 2px solid #7A40E0 !important;
  box-shadow: 0 0 8px rgba(122, 64, 224, 0.9) !important;
}

.mensaje-error {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

.linea-separadora {
  margin: 30px auto !important;
  width: 80%;
  border: 0;
  border-top: 3px solid #ccc;
}

.texto-centrado {
  text-align: center;
  margin-bottom: 15px !important;
}

::v-deep(.texto-olvido strong) {
  display: block;
  text-decoration: underline;
  margin-top: 20px !important;
  cursor: pointer;
  text-align: center;
  font-weight: 600 !important;
  color: inherit !important;
}

::v-deep(header[data-v-7a7a37b1]) {
  display: none !important;
}
</style>
