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
        <!-- <div class="contenedor-inputs">
          <div class="grupo-input">
            <label for="correo">Email</label>
            <input id="correo" type="email" placeholder="Introduce tu email" required />
          </div>

          <div class="grupo-input">
            <label for="clave">Contraseña</label>
            <div class="envoltorio-clave">
              <input ref="claveInput" id="clave" type="password" placeholder="Crea una contraseña" required />
              <span class="icono material-icons" @click="togglePassword">visibility</span>
            </div>
          </div>
        </div> -->

        <PruebaInput label_input="Email" placeholder="Introduce tu email" type="email"/>
        <PruebaInput label_input="Contraseña" placeholder="Introduce tu contraseña" type="password"/>

<<<<<<< HEAD
        <!-- Checkbox de Términos -->
=======
        <!-- Checkbox de Términos
>>>>>>> 7c7e8f1 (Nuevo mensaje más claro para el commit)
        <div class="contenedor-checkbox">
          <label class="checkbox-personalizado">
            <input type="checkbox" v-model="aceptaTerminos" />
            <span class="marca"></span>
          </label>
          <span class="texto-checkbox">Acepto los Términos y condiciones de uso</span>
<<<<<<< HEAD
        </div>
=======
        </div>  -->
        <!-- ✅ Reemplazamos el checkbox manual por el componente -->
        <Checkbox v-model="aceptaTerminos" label="Acepto los Términos y condiciones de uso" />
>>>>>>> 7c7e8f1 (Nuevo mensaje más claro para el commit)

        <!-- Botón Siguiente -->
        <PrimaryButton 
          label="Siguiente" 
          type="submit" 
<<<<<<< HEAD
          :disabled="!aceptaTerminos"
          ruta="/datos-personales"
        />
=======
          v-model="aceptaTerminos"
          ruta="/datos-personales"
        />


>>>>>>> 7c7e8f1 (Nuevo mensaje más claro para el commit)
      </form>

      <p class="texto-centrado">¿Ya tienes cuenta?</p>

      <!-- Botón Iniciar Sesión -->
      <SecondaryButton label="Ir a iniciar sesión" type="button" @click="irALogin" />

      <p class="texto-olvido"><strong>¿Has olvidado tu contraseña?</strong></p>
      <hr class="linea-separadora" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import PruebaInput from '@/components/PruebaInput.vue';
<<<<<<< HEAD
=======
import Checkbox from '@/components/Checkbox.vue'; // ✅ Importamos el checkbox
>>>>>>> 7c7e8f1 (Nuevo mensaje más claro para el commit)

const router = useRouter();
const aceptaTerminos = ref(false);
const claveInput = ref(null);

// 📌 Función para ir a DatosPersonalesView desde LoginView2
const irADatosPersonales = () => {
  if (aceptaTerminos.value) {
    router.push('/datos-personales');  // 🔥 Redirección corregida
  }
};

// 📌 Función para ir a Login desde LoginView2
const irALogin = () => {
  router.push('/login'); // 🔥 Redirección correcta a Login
};

// 📌 Mostrar/Ocultar contraseña
const togglePassword = () => {
  if (claveInput.value) {
    claveInput.value.type = claveInput.value.type === "password" ? "text" : "password";
  }
};
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

/* 📌 INPUTS MÁS ESPACIOSOS */
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
  gap: 12px;
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
</style>
