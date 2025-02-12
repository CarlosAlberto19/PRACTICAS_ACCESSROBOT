<template>
  <div class="page-container">
    <!-- CABECERA: Título + Imagen, centrados arriba -->
    <div class="header">
      <h1 class="title">Access Robot</h1>
      <img 
        src="@/assets/images/ARturo.png" 
        alt="Robot" 
        class="robot-img" 
      />
    </div>

    <!-- CONTENEDOR HORIZONTAL (TODO EN UNA SOLA FILA SI LO DESEAS) -->
    <div class="horizontal-container">
      <!-- FORMULARIO (dentro de su caja) -->
      <div class="form-box">
        <h2 class="subtitle">Crear nueva cuenta</h2>
        
        <div class="input-group">
          <label for="email">Email</label>
          <input 
            id="email" 
            type="email" 
            placeholder="Introduce tu email" 
          />

          <label for="password">Contraseña</label>
          <div class="password-wrapper">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Crea una contraseña"
            />
            <span class="icon material-icons" @click="togglePassword">
              {{ showPassword ? 'visibility_off' : 'visibility' }}
            </span>
          </div>
        </div>

        <!-- Checkbox de Términos -->
        <div class="checkbox-container">
          <label class="custom-checkbox">
            <input type="checkbox" v-model="aceptaTerminos" />
            <span class="checkmark"></span>
          </label>
          <span class="checkbox-label">
            Acepto los Términos y condiciones de uso
          </span>
        </div>

        <!-- Botón para ir a la siguiente vista -->
        <PrimaryButton
          label="Siguiente"
          type="button"
          :disabled="!aceptaTerminos"
          @click="handleNext"
        />

        <hr class="divider" />

        <p>¿Ya tienes cuenta?</p>

        <!-- Botón para ir a Iniciar Sesión -->
        <SecondaryButton
          label="Ir a iniciar sesión"
          type="button"
          @click="goToLogin"
        />
      </div>

      <!-- 
        🔻 Si quieres añadir otra sección (imágenes, texto, etc.) a la derecha,
        puedes añadirla aquí. Deja este div vacío o quítalo si no lo necesitas.
      -->
      <!-- <div class="other-section">
        <p>Contenido adicional</p>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

/* Importa tus componentes de botón */
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';

const router = useRouter();

// Checkbox de términos
const aceptaTerminos = ref(false);

// Mostrar / ocultar password
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Botón "Siguiente"
const handleNext = () => {
  if (aceptaTerminos.value) {
    console.log("Redirigiendo a la siguiente vista...");
    router.push('/auth');
  }
};

// Botón "Ir a iniciar sesión"
const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
/* Importación de íconos de Google (visibility, visibility_off, etc.) */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* --- RESETEO BÁSICO (opcional) --- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* --- CONTENEDOR PRINCIPAL, CENTRADO HORIZONTALMENTE --- */
.page-container {
  width: 100%;
  max-width: 1200px;  /* Ajusta según necesites */
  margin: 0 auto;      /* Centra horizontalmente */
  background-color: #f8f9fa;
  padding: 20px;
}

/* CABECERA: TÍTULO + IMAGEN, ALINEADO AL CENTRO */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}

.robot-img {
  width: 140px;
  height: auto;
  object-fit: contain;
}

/* --- CONTENEDOR HORIZONTAL PARA TODO EL CONTENIDO --- */
.horizontal-container {
  display: flex;                /* Fila */
  flex-direction: row;
  justify-content: center;      /* Centra horizontalmente el contenido */
  align-items: flex-start;      /* Alinea arriba (puedes cambiar a center) */
  gap: 50px;                    /* Espacio entre columnas */
  width: 100%;                  /* Ocupa todo el ancho disponible */
}

/* --- CAJA DEL FORMULARIO --- */
.form-box {
  flex: 1;                      /* Para que ocupe espacio y se ajuste */
  max-width: 450px;             /* Ancho máximo del formulario */
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* Subtítulo dentro de la caja */
.subtitle {
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
}

/* --- INPUTS --- */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.input-group label {
  font-size: 16px;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}

/* --- PASSWORD WRAPPER (input + ícono) --- */
.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: 40px;
}

.icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 22px;
  color: #666;
  transition: color 0.3s;
}
.icon:hover {
  color: #333;
}

/* --- CHECKBOX DE TÉRMINOS --- */
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin-bottom: 15px;
}

.custom-checkbox {
  display: inline-flex;
  align-items: center;
  position: relative;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  width: 18px;
  height: 18px;
  background-color: #E9E9E9;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.custom-checkbox input:checked + .checkmark {
  background-color: #4CAF50;
}

.custom-checkbox input:checked + .checkmark::after {
  content: "✔";
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: block;
  text-align: center;
}

/* --- SEPARADOR --- */
.divider {
  margin: 20px 0;
  width: 100%;
  border: 0;
  border-top: 1px solid #ccc;
}
</style>
