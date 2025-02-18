<template>
    <div class="contenedor-pagina">
      <div class="caja-formulario">
        <!-- 📌 CABECERA -->
        <div class="cabecera">
          <h1 class="titulo">Access Robot</h1>
          <img src="@/assets/images/ARturo.png" alt="Robot" class="imagen-robot" />
        </div>
  
        <h2 class="subtitulo">Crear nueva cuenta</h2>
  
        <!-- 📌 FORMULARIO -->
        <form @submit.prevent="irADatosPersonales">
          <PruebaInput label_input="Email" placeholder="Introduce tu email" type="email" v-model="email" />
  
          <!-- Contraseña con validaciones -->
          <div class="grupo-input">
            <label>Contraseña</label>
            <div class="envoltorio-clave">
              <input :type="mostrarClave ? 'text' : 'password'" v-model="password" placeholder="Crea una contraseña" />
              <span class="icono material-icons" @click="togglePassword">{{ mostrarClave ? 'visibility_off' : 'visibility' }}</span>
            </div>
            <ul class="validaciones">
              <li :class="{ valido: password.length >= 8 }">✅ Entre 8 y 16 caracteres</li>
              <li :class="{ valido: tieneMayusMinus }">✅ Mayúsculas y minúsculas</li>
              <li :class="{ valido: tieneNumero }">✅ Al menos un número</li>
            </ul>
          </div>
  
          <!-- Checkbox de Términos -->
          <Checkbox v-model="aceptaTerminos" label="Acepto los Términos y condiciones de uso" />
  
          <!-- Botón Siguiente deshabilitado hasta que se cumplan condiciones -->
          <PrimaryButton label="Siguiente" type="submit" :disabled="!validarFormulario" />
        </form>
  
        <!-- Texto "¿Ya tienes cuenta?" -->
        <p class="texto-centrado">¿Ya tienes cuenta?</p>
        <SecondaryButton label="Ir a iniciar sesión" type="button" @click="irALogin" />
  
        <p class="texto-olvido"><strong>¿Has olvidado tu contraseña?</strong></p>
        <hr class="linea-separadora" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import PrimaryButton from '@/components/PrimaryButton.vue';
  import SecondaryButton from '@/components/SecondaryButton.vue';
  import PruebaInput from '@/components/PruebaInput.vue';
  import Checkbox from '@/components/Checkbox.vue';
  
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const aceptaTerminos = ref(false);
  const mostrarClave = ref(false);
  
  const togglePassword = () => {
    mostrarClave.value = !mostrarClave.value;
  };
  
  const tieneMayusMinus = computed(() => /[a-z]/.test(password.value) && /[A-Z]/.test(password.value));
  const tieneNumero = computed(() => /\d/.test(password.value));
  const validarFormulario = computed(() => password.value.length >= 8 && tieneMayusMinus.value && tieneNumero.value && aceptaTerminos.value);
  
  const irADatosPersonales = () => {
    if (validarFormulario.value) {
      router.push('/datos-personales');
    }
  };
  
  const irALogin = () => {
    router.push('/login');
  };
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
  
  .subtitulo {
    font-size: 20px;
    font-weight: 500;
    margin: 20px 0;
  }
  
  .grupo-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  
  .envoltorio-clave {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .envoltorio-clave input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  
  .icono {
    position: absolute;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
  }
  
  .validaciones {
    font-size: 14px;
    list-style: none;
    padding: 0;
  }
  
  .validaciones li {
    color: red;
  }
  
  .validaciones li.valido {
    color: green;
  }
  
  .texto-centrado {
    text-align: center;
    margin: 15px 0;
    font-size: 16px;
  }
  
  .texto-olvido {
    margin-top: 20px;
    font-weight: bold;
  }
  
  .linea-separadora {
    margin: 15px auto;
    width: 70%;
    border: 0;
    border-top: 3px solid black;
  }
  </style>
