<template>
  <div class="contenedor-pagina">
    <!-- CABECERA: Título + Imagen, centrados arriba -->
    <div class="cabecera">
      <h1 class="titulo">AccessRobots</h1>
      <img src="@/assets/images/ARturo.png" alt="Robot" class="imagen-robot" />
    </div>

    <!-- CONTENEDOR PRINCIPAL EN HORIZONTAL -->
    <div class="contenedor-horizontal">
      <!-- FORMULARIO -->
      <div class="caja-formulario">
        <h2 class="subtitulo">Crear nueva cuenta</h2>
        
        <div class="grupo-inputs">
          <div class="campo">
            <label for="correo">Email</label>
            <input id="correo" type="email" placeholder="Introduce tu email" />
          </div>

          <div class="campo">
            <label for="clave">Contraseña</label>
            <div class="envoltorio-clave">
              <input id="clave" type="password" placeholder="Crea una contraseña" />
              <span class="icono material-icons">visibility</span>
            </div>
          </div>
        </div>

        <!-- Checkbox de Términos -->
        <div class="contenedor-checkbox">
          <label class="checkbox-personalizado">
            <input type="checkbox" v-model="aceptaTerminos" />
            <span class="marca"></span>
          </label>
          <span class="texto-checkbox">Acepto los Términos y condiciones de uso</span>
        </div>

        <!-- Botón Siguiente -->
        <PrimaryButton label="Siguiente" type="button" :disabled="!aceptaTerminos" @click="handleNext" />

        <!-- Nueva separación para "¿Ya tienes cuenta?" -->
        <div class="separador-inferior"></div>

        <p class="texto-centrado">¿Ya tienes cuenta?</p>

        <!-- Botón Iniciar Sesión -->
        <SecondaryButton label="Ir a iniciar sesión" type="button" @click="goToLogin" />

        <!-- Texto de "¿Has olvidado tu contraseña?" -->
        <p class="texto-olvido"><strong>¿Has olvidado tu contraseña?</strong></p>

        <!-- Línea negra mejorada -->
        <hr class="linea-separadora" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';

const router = useRouter();
const aceptaTerminos = ref(false);

const handleNext = () => {
  if (aceptaTerminos.value) {
    router.push('/auth');
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
/* CONTENEDOR PRINCIPAL */
.contenedor-pagina {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f8f9fa;
  padding: 20px;
}

/* CABECERA */
.cabecera {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.titulo {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}

.imagen-robot {
  width: 140px;
  height: auto;
  object-fit: contain;
}

/* CONTENEDOR HORIZONTAL */
.contenedor-horizontal {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
  width: 100%;
}

/* CAJA DEL FORMULARIO */
.caja-formulario {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* INPUTS */
.grupo-inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
  text-align: left; /* ✅ Todo alineado a la izquierda */
}

.campo {
  display: flex;
  flex-direction: column;
}

.campo label {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}

.campo input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}

/* PASSWORD WRAPPER */
.envoltorio-clave {
  position: relative;
}

.envoltorio-clave input {
  padding-right: 40px;
}

.icono {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 22px;
  color: #666;
  transition: color 0.3s;
}

.icono:hover {
  color: #333;
}

/* CHECKBOX */
.contenedor-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin-bottom: 15px;
}

.checkbox-personalizado {
  display: inline-flex;
  align-items: center;
  position: relative;
}

.checkbox-personalizado input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.marca {
  width: 18px;
  height: 18px;
  background-color: #E9E9E9;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.checkbox-personalizado input:checked + .marca {
  background-color: #4CAF50;
}

.checkbox-personalizado input:checked + .marca::after {
  content: "✔";
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: block;
  text-align: center;
}

/* SEPARADOR PARA "¿YA TIENES CUENTA?" */
.separador-inferior {
  margin-top: 25px;
}

/* LÍNEA SEPARADORA MEJORADA */
.linea-separadora {
  margin: 15px auto;
  width: 60%;  /* 🔥 Más corta */
  border: 0;
  border-top: 3px solid black; /* 🔥 Más grosor y color negro */
}

/* TEXTO DE "¿HAS OLVIDADO TU CONTRASEÑA?" */
.texto-olvido {
  margin-top: 15px; /* Ajusta el espaciado */
  font-weight: bold;
  text-decoration: none;
}
</style>
