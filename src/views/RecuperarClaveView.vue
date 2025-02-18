<template>
    <div class="contenedor-pagina">
      <div class="caja-formulario">
        <!-- CABECERA -->
        <div class="cabecera">
          <h1 class="titulo">Recuperar Contraseña</h1>
          <img src="@/assets/images/ARturo.png" alt="Robot" class="imagen-robot" />
        </div>
  
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
                class="input-mas-grande"
              />
              <!-- ✅ Check si el email es válido -->
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
  
          <!-- Botón Enviar (habilitado solo si el email es válido) -->
          <PrimaryButton
            class="boton-enviar"
            label="Enviar"
            type="submit"
            :disabled="!emailValido"
          />
  
          <div class="espaciador"></div>
  
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
  const errorEmail = ref('')
  const mensajeExito = ref('')
  
  /* 
    ✅ Validaciones del email:
    - No debe tener espacios en blanco
    - Solo debe haber un "@" en la dirección
    - Debe contener "." después del "@"
    - No debe exceder los 50 caracteres
  */
  const emailValido = computed(() => {
    const reEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
    return reEmail.test(email.value) && email.value.length <= 50
  })
  
  /*
    ✅ Validar email en tiempo real:
    - Borra espacios automáticamente
    - Muestra mensajes de error si el email no cumple los requisitos
  */
  const validarEmail = () => {
    // Elimina espacios dentro del email
    email.value = email.value.replace(/\s+/g, '')
  
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
  
  /*
    ✅ Enviar formulario:
    - Si el email es válido, muestra mensaje de éxito
    - Borra el mensaje tras 5 segundos
  */
  const formSubmit = async () => {
    try {
      if (emailValido.value) {
        // Simulamos una petición al backend
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
  /* CONTENEDOR PRINCIPAL */
  .contenedor-pagina {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95vh;
    width: 100%;
    background-color: #f8f9fa;
  }
  
  /* CAJA FORMULARIO */
  .caja-formulario {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    max-width: 600px;
    background: white;
    padding: 50px;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-20px);
  }
  
  /* CABECERA */
  .cabecera {
    text-align: center;
    margin-bottom: 30px;
  }
  .titulo {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .imagen-robot {
    width: 130px;
    height: auto;
    margin-top: 10px;
  }
  .subtitulo {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 25px;
  }
  
  /* GRUPO INPUT */
  .grupo-input {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin-bottom: 15px;
  }
  .label-email {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: -5px;
  }
  
  /* INPUT MÁS GRANDE 📏 */
  .input-mas-grande {
    font-size: 20px !important;
    padding: 16px !important;
    width: 400px; /* MÁS GRANDE */
  }
  
  /* ÍCONO CHECK MÁS PEQUEÑO ✅ */
  .envoltorio-input {
    display: flex;
    align-items: center;
    position: relative;
  }
  .icono-check {
    position: absolute;
    right: 8px;  /* MÁS PEGADO AL INPUT */
    font-size: 18px; /* MÁS PEQUEÑO */
    color: green;
  }
  
  /* MENSAJES */
  .mensaje-error {
    color: red;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .mensaje-exito {
    color: green;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  /* BOTONES */
  .boton-enviar {
    margin-top: 10px;
  }
  .espaciador {
    height: 20px;
  }
  </style>
  