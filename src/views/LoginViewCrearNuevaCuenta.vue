<!-- filepath: /c:/Users/carlo/Desktop/Xtd Talento Digital Once/PRACTICAS_ACCESSROBOT-master/src/views/LoginViewCrearNuevaCuenta.vue -->
<template>
  <div class="contenedor-pagina">
    <div class="caja-formulario">
      <!-- CABECERA -->
      <div class="cabecera">
        <h1 class="titulo">Iniciar Sesión</h1>
        <img
          src="@/assets/images/ARturo.png"
          alt="Robot"
          class="imagen-robot"
        />
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
            <!-- Check verde si emailValido -->
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
              :isValid="passwordValida"
              class="input-estilizado"
              :class="{
                'error-borde': errorPassword !== '',
                'borde-iluminado': passwordFocus
              }"
              @focus="passwordFocus = true"
              @blur="passwordFocus = false"
            />
            <!-- 🔴 Se ha eliminado el check de la contraseña aquí -->
            <!-- <span v-if="passwordValida" class="icono-check">✔</span> -->
          </div>
          <p v-if="errorPassword" class="mensaje-error">❌ {{ errorPassword }}</p>
        </div>

        <!-- Botón Entrar (deshabilitado si hay error) -->
        <PrimaryButton
          class="boton-enviar"
          label="Entrar"
          type="submit"
          :disabled="botonDeshabilitado || enviando"
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

import PruebaInput from "@/components/PruebaInput.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import SecondaryButton from "@/components/SecondaryButton.vue";

const router = useRouter();

// =============================
// Variables reactivas
// =============================
const email = ref("");
const password = ref("");
const mostrarPassword = ref(false); // 👁 Controla si la contraseña es visible
const emailFocus = ref(false);
const passwordFocus = ref(false);
const enviando = ref(false);

// Errores (si están vacíos => no hay error)
const errorEmail = ref("");
const errorPassword = ref("");

// =============================
// Validar Email
// =============================
function validarEmail() {
  email.value = email.value.replace(/\s+/g, ""); // 🔹 Elimina espacios

  if (!email.value) {
    errorEmail.value = "El email no puede estar vacío.";
    return;
  }
  if ((email.value.match(/@/g) || []).length > 1) {
    errorEmail.value = 'El email solo puede contener un "@"';
    return;
  }
  if (!email.value.includes("@")) {
    errorEmail.value = 'El email debe contener "@"';
    return;
  }
  if (!email.value.includes(".")) {
    errorEmail.value = 'El email debe contener "." después de "@"';
    return;
  }
  if (email.value.length > 50) {
    errorEmail.value = "El email no puede superar los 50 caracteres.";
    return;
  }
  const reEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!reEmail.test(email.value)) {
    errorEmail.value = "Introduce un email válido (ej: usuario@gmail.com)";
    return;
  }
  errorEmail.value = "";
}
const emailValido = computed(() => errorEmail.value === "" && email.value !== "");

// =============================
// Validar Password
// =============================
function validarPassword() {
  if (!password.value) {
    errorPassword.value = "La contraseña no puede estar vacía.";
    return;
  }
  if (password.value.length < 8 || password.value.length > 16) {
    errorPassword.value = "Debe tener entre 8 y 16 caracteres.";
    return;
  }
  if (!/[a-z]/.test(password.value) || !/[A-Z]/.test(password.value)) {
    errorPassword.value = "Debe incluir mayúsculas y minúsculas.";
    return;
  }
  if (!/\d/.test(password.value)) {
    errorPassword.value = "Debe contener al menos un número.";
    return;
  }
  if (/\s/.test(password.value)) {
    errorPassword.value = "No se permiten espacios en la contraseña.";
    return;
  }
  if (/[^a-zA-Z0-9!@#$%^&*]/.test(password.value)) {
    errorPassword.value = "No se permiten caracteres especiales extraños.";
    return;
  }
  errorPassword.value = "";
}
const passwordValida = computed(() => errorPassword.value === "" && password.value !== "");

// =============================
// Botón Deshabilitado
// =============================
const botonDeshabilitado = computed(() => {
  return !emailValido.value || !passwordValida.value;
});

// =============================
// Función para login
// =============================
async function validarLogin() {
  // Forzamos validaciones
  validarEmail();
  validarPassword();

  if (errorEmail.value || errorPassword.value) {
    return;
  }

  // Evitar envíos múltiples
  if (enviando.value) return;
  enviando.value = true;

  // Simulación de envío
  setTimeout(() => {
    router.push("/");
    enviando.value = false;
  }, 1000);
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
/* ✅ Se elimina font-weight aquí porque no afecta a los labels */
.contenedor-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  width: 100%;
  background-color: #f8f9fa;
}

/* ✅ Se mantiene sin cambios */
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

/* ✅ Títulos */
.subtitulo {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
}

/* ✅ Imagen */
.imagen-robot {
  width: 120px;
  margin: 15px auto;
  display: block;
}

/* ✅ Se mantiene pero sin `font-weight` */
::v-deep(.campo) {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  position: relative;
  font-size: 16px;
  margin-top: 20px;
}

/* ✅ FORZAMOS EL LABEL A NEGRITA */
::v-deep(.campo label) {
  font-weight: 600 !important; /* 🔥 AHORA SÍ SE VE MÁS NEGRITA */
  font-size: 18px; /* 🔹 Ajusta el tamaño si lo quieres más grande */
  color: #000; /* 🔹 Asegura que sea negro */
  margin-bottom: 6px; /* 🔹 Más separación del input */
}

/* ✅ Ajuste del input-container */
::v-deep(.input-container) {
  width: 100%;
}

/* ✅ Corrección del check (✔) dentro del input */
.icono-check {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-10%);
  font-size: 22px;
  color: green;
}

/* ✅ Estilos de error */
.error-borde {
  border: 2px solid red !important;
  box-shadow: 0 0 8px rgba(255,0,0,0.9) !important;
}

.borde-iluminado {
  border: 2px solid #7A40E0 !important;
  box-shadow: 0 0 8px rgba(122,64,224,0.9) !important;
}

/* ✅ Mensaje de error */
.mensaje-error {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

/* ✅ Barra separadora */
.linea-separadora {
  margin: 30px auto !important;
  width: 80%;
  border: 0;
  border-top: 3px solid #ccc;
}

/* ✅ Centramos los textos */
.texto-centrado {
  text-align: center;
  margin-bottom: 15px !important;
}

.texto-olvido {
  text-decoration: underline;
  margin-top: 20px !important;
  cursor: pointer;
  text-align: center;
}

</style>
