<template>
  <div class="contenedor-pagina">
    <div class="caja-formulario">
      <!-- CABECERA -->
      <div class="cabecera">
        <h1 class="titulo">Access Robot</h1>
        <img src="@/assets/images/ARturo.png" alt="Robot" class="imagen-robot" />
      </div>

      <h2 class="subtitulo">Crear nueva cuenta</h2>

      <!-- FORMULARIO -->
      <form @submit.prevent="irADatosPersonales">
        <!-- EMAIL -->
        <PruebaInput  label_input="Email" placeholder="Introduce tu email" type="email" v-model="email" />

        <!-- CONTRASEÑA con validaciones -->
        <PruebaInput
          label_input="Contraseña"
          placeholder="Introduce tu contraseña"
          type="password"
          class="contenedor-contraseña"
          v-model="password"
        />

        <!-- Detalles de validación de la contraseña -->
        <div class="grupo-input">
          <label class="label-contraseña">Tu contraseña debe contener:</label>
          <ul class="validaciones">
            <!-- 8 a 16 caracteres -->
           <li :class="tieneMayusMinus ? 'valido' : (password.length > 0 ? 'error' : 'pendiente')">
  mayúsculas y minúsculas
</li>
            <!-- Mayúsculas y minúsculas -->
            <li :class="validacionClase(tieneMayusMinus)">
              <span>{{ validacionIcono(tieneMayusMinus) }}</span>
              mayúsculas y minúsculas
            </li>

            <!-- Al menos un número -->
            <li :class="validacionClase(tieneNumero)">
              <span>{{ validacionIcono(tieneNumero) }}</span>
              al menos un número
            </li>
          </ul>
        </div>

        <!-- Checkbox de Términos -->
        <Checkbox v-model="aceptaTerminos" label="Acepto los Términos y condiciones de uso" />

        <!-- Botón Siguiente (habilitado solo si todo es válido) -->
        <PrimaryButton
      label="Siguiente"
      type="submit"
      :disabled="!validarFormulario"
      :ruta="'/datos-personales'"
    />

      </form>
      <hr class="linea-separadora" />
      <!-- Texto "¿Ya tienes cuenta?" + Botón Iniciar Sesión -->
      <p class="texto-centrado">¿Ya tienes cuenta?</p>
      <SecondaryButton label="Ir a iniciar sesión" type="button" @click="irALogin" />

      <!-- Texto "¿Has olvidado tu contraseña?" (lleva a recuperar clave) -->
      <p class="texto-olvido" @click="irARecuperarContrasena">
        <strong>¿Has olvidado tu contraseña?</strong>
      </p>

      
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

// Validaciones de la contraseña
const tieneMayusMinus = computed(() =>
  /[a-z]/.test(password.value) && /[A-Z]/.test(password.value)
);
const tieneNumero = computed(() => /\d/.test(password.value));

const validarFormulario = computed(() =>
  password.value.length >= 8 &&
  password.value.length <= 16 &&
  tieneMayusMinus.value &&
  tieneNumero.value &&
  aceptaTerminos.value
);

// Funciones para cambiar estilos de validación dinámicamente
const validacionClase = (condicion) => {
  return condicion ? 'valido' : 'error';
};

const validacionIcono = (condicion) => {
  return condicion ? '✔' : '!';
};


// Navegación
const irADatosPersonales = () => {
  if (validarFormulario.value) {
    router.push('/datos-personales');
  }
};

const irALogin = () => {
  router.push('/login');
};

const irARecuperarContrasena = () => {
  router.push('/recuperar-clave');
};
</script>

<style scoped>
/* ============================ */
/* ============================ */
/* CONTENEDOR PRINCIPAL */
/* ============================ */
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

/* ============================ */
/* CABECERA */
/* ============================ */
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

/* ============================ */
/* SUBTITULO */
/* ============================ */
.subtitulo {
  font-size: 20px;
  font-weight: 500;
  margin: 20px 0;
}

/* ============================ */
/* CABECERA */
/* ============================ */
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

/* ============================ */
/* SUBTITULO */
/* ============================ */
.subtitulo {
  font-size: 20px;
  font-weight: 500;
  margin: 20px 0;
}


/* ============================ */
/* VALIDACIONES CONTRASEÑA ESTILO EXACTO */
/* ============================ */
.validaciones {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
}

/* ✅ CORRECTO: Círculo verde con check blanco */
.validaciones li.valido::before {
  content: "✔";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: green;
  color: white;
  font-size: 14px;
  font-weight: bold;
}

/* ⚪ PENDIENTE: Círculo blanco con borde gris y check gris */
.validaciones li.pendiente::before {
  content: "✔";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid gray;
  color: gray;
  font-size: 14px;
  font-weight: bold;
}

/* ❌ INCORRECTO: Círculo rojo con "!" blanco */
.validaciones li.error::before {
  content: "!";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 14px;
  font-weight: bold;
}
/* 💥 ELIMINAMOS LA SEGUNDA COLUMNA (YA NO HAY "X") */
.validaciones li span {
  display: none;
}



/* ============================ */
/* "ACEPTO LOS TÉRMINOS" SUBRAYADO */
/* ============================ */
.checkbox-container label {
  text-decoration: underline;
}

/* ============================ */
/* SEPARACIÓN ENTRE CHECKBOX Y BOTÓN */
/* ============================ */
:deep(.checkbox-container) {
  margin-top: 20px;
}

:deep(.primary-button) {
  margin-top: 30px;
}





/* ============================ */
/* ANIMACIONES EN LOS INPUTS */
/* (Mantenemos el tamaño original) */
/* ============================ */
:deep(.prueba-input .contenedor-input) {
  position: relative;
  width: 100%;
}

/* 🔥 EFECTO CUANDO EL INPUT ESTÁ EN FOCO 🔥 */
:deep(.prueba-input .contenedor-input input) {
  height: 50px; /* ⬅️ Volvemos al tamaño original */
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;
}

/* 🔥 EFECTO CUANDO EL INPUT TIENE FOCO 🔥 */
:deep(.prueba-input .contenedor-input input:focus) {
  border-color: #7A40E0; /* Morado */
  box-shadow: 0 0 6px rgba(122, 64, 224, 0.6);
  outline: none;
}

/* 🔥 EFECTO EN EL PLACEHOLDER AL HACER CLICK 🔥 */
:deep(.prueba-input .contenedor-input input::placeholder) {
  color: #666;
  transition: color 0.3s ease-in-out, font-weight 0.3s;
}

:deep(.prueba-input .contenedor-input input:focus::placeholder) {
  color: #7A40E0; /* Morado más intenso */
  font-weight: bold;
}

/* ============================ */
/* ICONO DEL OJO (NO SE DESALINEA) */
/* ============================ */
:deep(.icono-ojo) {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

:deep(.icono-ojo:hover) {
  color: #333;
}

/* ============================ */
/* SEPARACIÓN ENTRE INPUTS */
/* ============================ */
:deep(.prueba-input) {
  margin-bottom: 20px;
}

:deep(.prueba-input label) {
  font-weight: bold;
}

/* ============================ */
/* SEPARACIÓN ENTRE CHECKBOX Y BOTÓN */
/* ============================ */
:deep(.checkbox-container) {
  margin-top: 20px;
}

:deep(.primary-button) {
  margin-top: 30px;
}

/* ============================ */
/* SEPARADOR */
/* ============================ */
.linea-separadora {
  margin: 15px auto;
  width: 70%;
  border: 0;
  border-top: 3px solid black;
}

/* ============================ */
/* TEXTO “¿YA TIENES CUENTA?” */
/* ============================ */
.texto-centrado {
  margin-bottom: 10px;
  text-align: center;
  font-size: 16px;
}

/* ============================ */
/* TEXTO "¿HAS OLVIDADO TU CONTRASEÑA?" */
/* ============================ */
.texto-olvido {
  margin-top: 20px;
  font-weight: bold;
  cursor: pointer;
}

/* ============================ */
/* ESTILOS DEL GRUPO INPUT */
/* ============================ */
.grupo-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-bottom: 25px;
}

/* ============================ */
/* ESTILOS DE VALIDACIONES */
/* ============================ */
.label-contraseña {
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
  gap: 10px;
}

.validaciones {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
}

.validaciones li {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.validaciones li.valido {
  color: green;
}

.validaciones li.error {
  color: red;
}

/* ============================ */
/* FORZAR COLOR DEL CHECKBOX */
/* ============================ */
:deep(input[type="checkbox"]) {
  accent-color: #2ae89c;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>

