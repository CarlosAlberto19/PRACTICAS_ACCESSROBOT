<template>
  <div class="contenedor-pagina">
    <div class="caja-formulario">
      <!-- CABECERA -->
      <div class="cabecera">
        <h1 class="titulo">Recuperar Contraseña</h1>
        <img src="@/assets/images/ARturo.png" alt="Robot" class="imagen-robot animacion-robot" />
      </div>

      <!-- ✅ Reducimos el tamaño del texto y agregamos más separación -->
      <h2 class="subtitulo">Introduce tu correo para recuperar la contraseña</h2>

      <!-- FORMULARIO -->
      <form @submit.prevent="formSubmit">
        <!-- Campo Email con validación y check -->
        <div class="grupo-input">
          <label for="email" class="label-email">Email</label>
          <div class="envoltorio-input">
            <input
              id="email"
              placeholder="Introduce tu email"
              type="text"
              v-model="email"
              @input="validarEmail"
              @focus="animarPlaceholder(true)"
              @blur="animarPlaceholder(false)"
              class="input-estilizado"
              :class="{ 'borde-iluminado': emailFocus }"
            />
            <!-- ✅ Check bien alineado dentro del input -->
            <span v-if="emailValido" class="icono-check">✔</span>
          </div>
        </div>

        <!-- Mensaje de error -->
        <p v-if="errorEmail" class="mensaje-error">
          ❌ {{ errorEmail }}
        </p>

        <!-- Mensaje de éxito -->
        <p v-if="mensajeExito" class="mensaje-exito">
          {{ mensajeExito }}
        </p>

        <!-- ✅ MÁS SEPARACIÓN ENTRE INPUT Y BOTÓN -->
        <div class="espaciador-grande"></div>

        <!-- Botón Enviar -->
        <PrimaryButton
          class="boton-enviar"
          label="Enviar"
          type="submit"
          :disabled="!emailValido"
        />

        <!-- ✅ MÁS SEPARACIÓN ENTRE "Enviar" Y "Volver al login" -->
        <div class="espaciador-extra"></div>

        <!-- Botón Volver al login -->
        <SecondaryButton
          label="Volver al login"
          type="button"
          @click="irALogin"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'

const router = useRouter()

/* Variables reactivas */
const email = ref('')
const emailFocus = ref(false)
const errorEmail = ref('')
const mensajeExito = ref('')

/* ✅ Validaciones del email */
const emailValido = computed(() => {
  const reEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
  return reEmail.test(email.value) && email.value.length <= 50
})

/* ✅ Validar email en tiempo real */
const validarEmail = () => {
  email.value = email.value.replace(/\s+/g, '') // Elimina espacios

  if (!email.value) {
    errorEmail.value = ''
    return
  }
  if ((email.value.match(/@/g) || []).length > 1) {
    errorEmail.value = 'El email solo puede contener un "@"'
    return
  }
  if (!email.value.includes('@')) {
    errorEmail.value = 'El email debe contener "@"'
    return
  }
  if (!email.value.includes('.')) {
    errorEmail.value = 'El email debe contener un "." después de "@"'
    return
  }
  if (email.value.length > 50) {
    errorEmail.value = 'El email no puede superar los 50 caracteres.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.value)) {
    errorEmail.value = 'Introduce un email válido (ejemplo: usuario@gmail.com)'
  } else {
    errorEmail.value = ''
  }
}

/* ✅ Animación del placeholder al hacer clic */
const animarPlaceholder = (estado) => {
  emailFocus.value = estado
}

/* ✅ Enviar formulario */
const formSubmit = async () => {
  try {
    if (emailValido.value) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      mensajeExito.value = '📩 Hemos enviado un correo con las instrucciones.'
      setTimeout(() => {
        mensajeExito.value = ''
      }, 5000)
    }
  } catch (error) {
    console.error('Error en el formulario:', error)
  }
}

/* ✅ Botón volver al login */
const irALogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* ✅ Centrar todo el contenido */
.contenedor-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  width: 100%;
  background-color: #f8f9fa;
}

/* ✅ Estilización de la caja del formulario */
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

/* ✅ Animación del robot centrado */
@keyframes moverLateral {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
}

.animacion-robot {
  animation: moverLateral 2s ease-in-out infinite;
  width: 120px;
  height: auto;
  margin: 15px auto;
  display: block;
}

/* ✅ Estilos del subtítulo */
.subtitulo {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px; /* ✅ Más separación con el label */
}

/* ✅ Estilos del input */
.grupo-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 15px;
}
.label-email {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px; /* ✅ Más espacio entre el label y el input */
}

/* ✅ INPUT con animación de focus */
.input-estilizado {
  font-size: 16px !important;
  padding: 12px !important;
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}

/* ✅ Animación del placeholder y borde */
.input-estilizado::placeholder {
  color: #888;
  transition: color 0.3s ease;
}
.input-estilizado:focus::placeholder {
  color: #7A40E0;
  font-weight: bold;
}
.borde-iluminado {
  border-color: #7A40E0 !important;
  box-shadow: 0 0 8px rgba(122, 64, 224, 0.6);
}

/* ✅ Check dentro del input */
.envoltorio-input {
  position: relative;
}
.icono-check {
  position: absolute;
  right: 12px;
  font-size: 16px;
  color: green;
  top: 50%;
  transform: translateY(-50%);
}

/* ✅ Más separación entre input y botón */
.espaciador-grande {
  height: 25px;
}

/* ✅ MÁS SEPARACIÓN ENTRE "Enviar" Y "Volver al login" */
.espaciador-extra {
  height: 30px;
}

/* ✅ Botones */
.boton-enviar {
  margin-top: 10px;
}
</style>
