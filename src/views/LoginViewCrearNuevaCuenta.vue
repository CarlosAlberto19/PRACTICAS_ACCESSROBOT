<template>
  <div class="contenedor-pagina">
    <div class="caja-formulario">
      <!-- CABECERA -->
      <div class="cabecera">
        <h1 class="titulo">Access Robot</h1>
        <img src="@/assets/images/ARturo.png" alt="Robot" class="imagen-robot" />
      </div>

      <h2 class="subtitulo negrita">Crear nueva cuenta</h2>

      <!-- FORMULARIO -->
      <form @submit.prevent="irAPantallaInterior">
        <!-- Email -->
        <div class="grupo-input">
          <label for="email">Email</label>
          <PruebaInput
            id="email"
            placeholder="Introduce tu email"
            type="email"
            v-model="email"
          />
        </div>

        <!-- Contraseña con validaciones -->
        <div class="grupo-input">
          <label for="password">Contraseña</label>
          <div class="envoltorio-clave">
            <input
              id="password"
              :type="mostrarClave ? 'text' : 'password'"
              v-model="password"
              placeholder="Crea una contraseña"
            />
            <!-- ICONO DINÁMICO (ojo o check) -->
            <span class="icono material-icons" @click="togglePassword">
              {{ iconPassword }}
            </span>
          </div>

          <!-- Etiqueta "Tu contraseña debe contener..." -->
          <p class="titulo-validaciones">Tu contraseña debe contener:</p>

          <!-- Lista de validaciones -->
          <ul class="validaciones">
            <!-- 8 a 16 caracteres -->
            <li :class="{
              valido: password.length >= 8 && password.length <= 16,
              error: password.length > 0 && (password.length < 8 || password.length > 16)
            }">
              <span v-if="password.length >= 8 && password.length <= 16">✅</span>
              <span v-else-if="password.length > 0">❌</span>
              <span v-else>⚪</span>
              entre 8 y 16 caracteres
            </li>
            
            <!-- mayúsculas y minúsculas -->
            <li :class="{
              valido: tieneMayusMinus,
              error: password.length > 0 && !tieneMayusMinus
            }">
              <span v-if="tieneMayusMinus">✅</span>
              <span v-else-if="password.length > 0">❌</span>
              <span v-else>⚪</span>
              mayúsculas y minúsculas
            </li>

            <!-- al menos un número -->
            <li :class="{
              valido: tieneNumero,
              error: password.length > 0 && !tieneNumero
            }">
              <span v-if="tieneNumero">✅</span>
              <span v-else-if="password.length > 0">❌</span>
              <span v-else>⚪</span>
              al menos un número
            </li>
          </ul>
        </div>

        <!-- Checkbox de Términos -->
        <div class="checkbox-container">
          <Checkbox
            v-model="aceptaTerminos"
            label="Acepto los Términos y condiciones de uso"
          />
        </div>

        <!-- Botón Siguiente -->
        <PrimaryButton
          class="boton-siguiente"
          label="Siguiente"
          type="submit"
          :disabled="!validarFormulario"
        />
      </form>

      <!-- Línea separadora -->
      <hr class="linea-separadora" />

      <!-- Texto: ¿Ya tienes cuenta? + botón "Ir a iniciar sesión" -->
      <p class="texto-centrado">¿Ya tienes cuenta?</p>
      <SecondaryButton
        label="Ir a iniciar sesión"
        type="button"
        @click="irALogin"
      />

      <!-- Texto "¿Has olvidado tu contraseña?" en negrita y clicable -->
      <p class="texto-olvido" @click="irARecuperarContrasena">
        <strong>¿Has olvidado tu contraseña?</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import PruebaInput from '@/components/PruebaInput.vue'
import Checkbox from '@/components/Checkbox.vue'

const router = useRouter()

// Campos
const email = ref('')
const password = ref('')
const aceptaTerminos = ref(false)

// Mostrar / ocultar contraseña
const mostrarClave = ref(false)
const togglePassword = () => {
  mostrarClave.value = !mostrarClave.value
}

// Validaciones
const tieneMayusMinus = computed(() =>
  /[a-z]/.test(password.value) && /[A-Z]/.test(password.value)
)
const tieneNumero = computed(() => /\d/.test(password.value))

// Habilitar Botón “Siguiente” solo si todas las validaciones se cumplen
const validarFormulario = computed(() =>
  password.value.length >= 8 &&
  password.value.length <= 16 &&
  tieneMayusMinus.value &&
  tieneNumero.value &&
  aceptaTerminos.value
)

// Icono para el ojo (o check) de Material Icons
const iconPassword = computed(() => {
  if (validarFormulario.value) {
    return 'done' // check
  } else {
    return mostrarClave.value ? 'visibility_off' : 'visibility'
  }
})

// Navegaciones
const irAPantallaInterior = () => {
  if (validarFormulario.value) {
    router.push('/datos-interiores')
  }
}

const irALogin = () => {
  router.push('/login')
}

const irARecuperarContrasena = () => {
  router.push('/recuperar-clave')
}
</script>

<style scoped>
.contenedor-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #f8f9fa;
}

.caja-formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px;
  background: white;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* CABECERA */
.cabecera {
  text-align: center;
  margin-bottom: 20px;
}
.titulo {
  font-size: 36px;
  font-weight: bold;
}
.imagen-robot {
  width: 180px;
  height: auto;
  margin-top: 10px;
}

/* SUBTITULO */
.subtitulo {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
}

/* FORMULARIO */
.grupo-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-bottom: 25px;
}
.grupo-input label {
  font-size: 22px;
  font-weight: bold;
}

/* Contraseña: mostrar/ocultar */
.envoltorio-clave {
  position: relative;
  display: flex;
  align-items: center;
}
.envoltorio-clave input {
  width: 100%;
  padding: 16px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* Icono (ojo o check) */
.icono {
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 24px;
}

/* Texto “Tu contraseña debe contener:” */
.titulo-validaciones {
  font-weight: bold;
  margin: 10px 0 5px 0;
}

/* Validaciones de contraseña */
.validaciones {
  font-size: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Distinguimos clases .valido y .error para colorear: */
.validaciones li {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 6px; /* Espacio entre icono y texto */
}
.validaciones li.valido {
  color: green;
}
.validaciones li.error {
  color: red;
}

/* Checkbox */
.checkbox-container {
  margin-bottom: 5px;
}

/* Botón Siguiente */
.boton-siguiente {
  margin-top: 25px;
  margin-bottom: 15px;
}

/* Línea separadora */
.linea-separadora {
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

/* Texto “¿Ya tienes cuenta?” */
.texto-centrado {
  text-align: center;
  margin: 0 0 15px;
}

/* Texto “¿Has olvidado tu contraseña?” en negrita, clicable */
.texto-olvido {
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
}
</style>
