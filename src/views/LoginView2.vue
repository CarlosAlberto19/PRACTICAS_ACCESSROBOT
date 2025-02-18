<template>
  <div class="contenedor-pagina">
    <div class="caja-formulario">
      <!-- 📌 CABECERA DENTRO DEL FORMULARIO -->
      <div class="cabecera">
        <h1 class="titulo">Access Robot</h1>
        <img src="@/assets/images/ARturo.png" alt="Robot" class="imagen-robot" />
      </div>

      <h2 class="subtitulo">Crear nueva cuenta</h2>

      <!-- 📌 FORMULARIO -->
      <form @submit.prevent="irADatosPersonales">
        <PruebaInput label_input="Email" placeholder="Introduce tu email" type="email" />
        <PruebaInput label_input="Contraseña" placeholder="Introduce tu contraseña" type="password" />

        <!-- Checkbox de Términos -->
        <Checkbox
          v-model="aceptaTerminos"
          label="Acepto los Términos y condiciones de uso"
        />

        <!-- Botón Siguiente -->
        <PrimaryButton
          label="Siguiente"
          type="submit"
          v-model="aceptaTerminos"
          ruta="/datos-personales"
        />
      </form>

      <!-- Texto "¿Ya tienes cuenta?" -->
      <p class="texto-centrado">¿Ya tienes cuenta?</p>

      <!-- Botón Iniciar Sesión -->
      <SecondaryButton label="Ir a iniciar sesión" type="button" @click="irALogin" />

      <!-- Texto "¿Has olvidado tu contraseña?" -->
      <p class="texto-olvido"><strong>¿Has olvidado tu contraseña?</strong></p>
      <hr class="linea-separadora" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import PruebaInput from '@/components/PruebaInput.vue'
import Checkbox from '@/components/Checkbox.vue'

const router = useRouter()
const aceptaTerminos = ref(false)
const claveInput = ref(null)

// 📌 Función para ir a DatosPersonalesView
const irADatosPersonales = () => {
  if (aceptaTerminos.value) {
    router.push('/datos-personales')
  }
}

// 📌 Función para ir a Login
const irALogin = () => {
  router.push('/login')
}

// 📌 Mostrar/Ocultar contraseña
const togglePassword = () => {
  if (claveInput.value) {
    claveInput.value.type =
      claveInput.value.type === 'password' ? 'text' : 'password'
  }
}
</script>

<style scoped>
/* 📌 CONTENEDOR PRINCIPAL */
.contenedor-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #f8f9fa;
}

/* 📌 FORMULARIO EXPANDIDO Y CENTRADO */
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

/* 📌 CABECERA DENTRO DEL FORMULARIO */
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
}

/* 📌 SUBTITULO */
.subtitulo {
  font-size: 20px;
  font-weight: 500;
  margin: 20px 0;
}

/* 📌 INPUTS MÁS ESPACIOSOS (si usas contenedor-inputs) */
.contenedor-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.grupo-input {
  display: flex;
  flex-direction: column;
}

.grupo-input label {
  font-size: 18px;
  font-weight: 500;
}

.grupo-input input {
  width: 100%;
  padding: 14px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
}

/* 📌 PASSWORD WRAPPER */
.envoltorio-clave {
  position: relative;
}

.envoltorio-clave input {
  padding-right: 40px;
}

.icono {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 22px;
  color: #666;
}

/* 📌 CHECKBOX */
.contenedor-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}

/* 📌 SEPARADOR MEJORADO */
.linea-separadora {
  margin: 15px auto;
  width: 70%;
  border: 0;
  border-top: 3px solid black;
}

/* 📌 TEXTO "¿HAS OLVIDADO TU CONTRASEÑA?" */
.texto-olvido {
  margin-top: 20px;
  font-weight: bold;
}

/* ============================
   NUEVAS REGLAS PARA SEPARAR
=============================== */

/* Aumenta la separación entre inputs (PruebaInput) */
:deep(.prueba-input) {
  margin-bottom: 20px; /* Ajusta a tu gusto */
}

/* Haz los labels de PruebaInput más grandes y en negrita */
:deep(.prueba-input label) {
  font-size: 18px;  /* Más grande */
  font-weight: bold;
  margin-bottom: 5px;
}

/* Aumenta el tamaño del texto dentro del input de PruebaInput (opcional) */
:deep(.prueba-input .contenedor-input input) {
  font-size: 16px;
  padding: 14px; /* Ajusta a tu gusto */
}

/* Espacio extra entre el botón "Siguiente" y "¿Ya tienes cuenta?" */
:deep(.primary-button) {
  margin-bottom: 20px; /* Ajusta a tu gusto */
  margin-top: 15px;    /* Si quieres un poco de espacio sobre el botón */
}

/* Centra y separa un poco el texto "¿Ya tienes cuenta?" */
.texto-centrado {
  margin-bottom: 10px; 
  text-align: center;
  font-size: 16px;
}

/* Espacio extra entre el botón "Ir a iniciar sesión" y "¿Has olvidado tu contraseña?" */
:deep(.secondary-button) {
  margin-bottom: 30px;
}

/* Fuerza el color de la casilla en navegadores modernos */
:deep(input[type="checkbox"]) {
  accent-color: #2ae89c; /* Cambia a tu color preferido */
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
