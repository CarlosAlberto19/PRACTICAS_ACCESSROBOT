<template>
  <div class="ios-wrapper">
    <header class="header-bar">
      <button class="btn-atras" @click="irAtras">← Atrás</button>
      <h1 class="titulo-header">Nueva cuenta</h1>
    </header>

    <main class="contenedor-pagina">
      <div class="caja-formulario">
        <!-- DATOS PERSONALES -->
        <div class="cabecera">
          <h1 class="titulo">Tus datos personales</h1>
          <p class="subtitulo">Para que podamos comunicarnos contigo si es necesario.</p>
        </div>

        <div class="formulario">
          <!-- Nombre -->
          <PruebaInput 
            label_input="Nombre" 
            placeholder="Introduce tu nombre" 
            type="text"
            v-model="nombre" 
            @input="validarNombre" 
            @blur="validarNombre"
          />
          <span v-if="errorNombre" class="error-texto">⚠ Solo letras (máx. 30 caracteres)</span>

          <!-- Apellidos -->
          <PruebaInput 
            label_input="Primer apellido" 
            placeholder="Introduce tu primer apellido" 
            type="text"
            v-model="apellido1" 
            @input="validarApellido1"
            @blur="validarApellido1"
          />
          <span v-if="errorApellido1" class="error-texto">⚠ Solo letras (máx. 30 caracteres)</span>

          <PruebaInput 
            label_input="Segundo apellido (Opcional)" 
            placeholder="Introduce tu segundo apellido" 
            type="text"
            v-model="apellido2" 
            @input="validarApellido2"
            @blur="validarApellido2"
          />
          <span v-if="errorApellido2" class="error-texto">⚠ Solo letras (máx. 30 caracteres)</span>

          <!-- 📌 Teléfono principal -->
          <div class="telefono-container">
            <select v-model="codigoPais" class="codigo-pais">
              <option value="+34">ES +34</option>
              <option value="+1">US +1</option>
              <option value="+44">UK +44</option>
            </select>
            <PruebaInput id="telefono" class="input-telefono" placeholder="000000000" type="tel"
              v-model="telefono" @input="telefono = limpiarTelefono(telefono)" @blur="validarTelefono"
            />
          </div>
          <span v-if="errorTelefono" class="error-texto">⚠ Número inválido (9-15 dígitos)</span>
        </div>

        <div class="separador"></div>

        <!-- PERSONA DE CONFIANZA -->
        <div class="cabecera">
          <h2 class="titulo">Persona de confianza (Opcional)</h2>
          <p class="subtitulo">Le enviaremos notificaciones vía SMS. Si no, deja el formulario en blanco.</p>
        </div>

        <div class="formulario">
          <!-- Nombre o Alias -->
          <PruebaInput 
            label_input="Nombre o Alias" 
            placeholder="Introduce el nombre" 
            type="text"
            v-model="nombreConfianza" 
            @input="validarNombreConfianza" 
            @blur="validarNombreConfianza"
          />
          <span v-if="errorNombreConfianza" class="error-texto">⚠ Solo letras (máx. 30 caracteres)</span>

          <!-- 📌 Teléfono de confianza -->
          <div class="telefono-container">
            <select v-model="codigoPaisConfianza" class="codigo-pais">
              <option value="+34">ES +34</option>
              <option value="+1">US +1</option>
              <option value="+44">UK +44</option>
            </select>
            <PruebaInput class="input-telefono" id="telefonoConfianza" placeholder="000000000" type="tel"
              v-model="telefonoConfianza" @input="telefonoConfianza = limpiarTelefono(telefonoConfianza)" @blur="validarTelefonoConfianza"
            />
          </div>
          <span v-if="errorTelefonoConfianza" class="error-texto">⚠ Número inválido (9-15 dígitos)</span>
        </div>

        <!-- Botón -->
        <PrimaryButton label="Siguiente" type="button" :disabled="!formularioValido" @click="irAHemosTerminado"/>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PruebaInput from '@/components/PruebaInput.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';

const router = useRouter();
const route = useRoute(); // ✅ Capturar la información de la URL

// ✅ Recibir el email desde LoginView2 (NO se muestra en la UI)
const email = ref(route.query.email || '');

// ✅ Función para ir a "Hemos Terminado", PASANDO EL EMAIL
const irAHemosTerminado = () => {
  validarFormulario();
  if (formularioValido.value) {
    router.push({ path: "/hemos-terminado", query: { email: email.value } });
  } else {
    console.log('❌ Hay errores en el formulario');
  }
};

// 📌 Variables reactivas para los campos del formulario
const nombre = ref('');
const apellido1 = ref('');
const apellido2 = ref('');
const telefono = ref('');
const codigoPais = ref('+34');
const nombreConfianza = ref('');
const telefonoConfianza = ref('');
const codigoPaisConfianza = ref('+34');

// 📌 Validaciones
const errorNombre = ref(false);
const errorApellido1 = ref(false);
const errorApellido2 = ref(false);
const errorTelefono = ref(false);
const errorNombreConfianza = ref(false);
const errorTelefonoConfianza = ref(false);

const validarTexto = (campo) => {
  const texto = campo.trim();
  return texto.length >= 2 && texto.length <= 30 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(texto);
};

const limitarTexto = (campo) =>
  campo.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '').slice(0, 30);

const limpiarTelefono = (campo) =>
  campo.replace(/[^0-9+\-() ]/g, '').slice(0, 15);

const validarTelefono = () => {
  telefono.value = limpiarTelefono(telefono.value);
  const digits = telefono.value.replace(/[^0-9]/g, '');
  errorTelefono.value = digits.length < 9 || digits.length > 15;
};

const validarFormulario = () => {
  errorNombre.value = !validarTexto(nombre.value);
  errorApellido1.value = !validarTexto(apellido1.value);
  errorApellido2.value = apellido2.value.length > 0 && !validarTexto(apellido2.value);
  validarTelefono();
};

const formularioValido = computed(() =>
  !errorNombre.value &&
  !errorApellido1.value &&
  !errorApellido2.value &&
  !errorTelefono.value &&
  telefono.value.replace(/[^0-9]/g, '').length >= 9 &&
  telefono.value.replace(/[^0-9]/g, '').length <= 15
);
</script>




<style scoped>
/* ============================
   ENVOLTORIO GENERAL
=============================== */
.web-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
  box-sizing: border-box;
}

/* ============================
   STATUS BAR (hora, wifi, etc.)
   (SIN CAMBIOS)
=============================== */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  background-color: #8357E5; /* Morado */
  color: #fff;
  padding: 0 12px;
  margin: 0;
}

/* ============================
   BARRA SUPERIOR
   (AQUÍ HACEMOS LOS CAMBIOS)
=============================== */
.header-bar {
  position: relative;      /* Para colocar el botón con position absolute */
  display: flex;
  align-items: center;
  justify-content: center; /* Centra el título en el eje horizontal */
  height: 60px;
  background-color: #8357E5; 
  color: #fff;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Botón 'Atrás' a la izquierda */
.btn-atras {
  position: absolute;
  left: 20px;         /* Separa el botón del borde izquierdo */
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Flecha */
.flecha {
  font-size: 18px;
  transform: translateY(1px);
}

/* Título con texto en blanco */
.titulo-header {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #fff;           /* BLANCO */
}

/* ============================
   CONTENIDO PRINCIPAL
=============================== */
.contenedor-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1; 
  width: 100%;
  background-color: #f8f9fa;
}

/* ============================
   FORMULARIO EXPANDIDO Y CENTRADO
=============================== */
.caja-formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px; 
  background: white;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Cabeceras dentro del formulario */
.cabecera {
  text-align: center;
  margin-bottom: 20px;
}
.titulo {
  font-size: 36px;
  font-weight: bold;
  margin: 0 0 10px;
  color: #333;
}
.subtitulo {
  font-size: 18px;
  color: #666;
  margin: 0;
}

/* Separador */
.separador {
  margin: 30px auto;
  width: 70%;
  border: 0;
  border-top: 2px solid #ddd;
}

/* ============================
   FORMULARIO E INPUTS
=============================== */
.formulario {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  align-content: center;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}
.error-texto {
  color: red;
  font-size: 14px;
  margin-top: -10px;
}

/* ============================
   TELÉFONO (select + input)
=============================== */
.telefono-container {
  display: flex;
  align-items: center; /* 🔥 Alinea los elementos verticalmente */
  gap: 50px;
  width: 100%;
}

.codigo-pais {
  flex: 0 0 100px;
  height: 48px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-align: center;
  box-sizing: border-box;
  margin: 0;
}

/* ============================
   AJUSTE DEL TAMAÑO DE LOS INPUTS (-25%)
=============================== */
:deep(.prueba-input .contenedor-input input) {
  height: 45px; /* Antes 32px (+15%) */
  width: 90%; /* Antes 70% (+15%) */
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid #ccc; /* Borde normal */
  transition: all 0.3s ease-in-out;
}

:deep(.prueba-input .contenedor-input input:focus) {
  border-color: #7A40E0; /* 🔥 Color morado (puedes cambiarlo) */
  box-shadow: 0 0 5px rgba(122, 64, 224, 0.6); /* Efecto de brillo */
  outline: none; /* Elimina el borde azul por defecto */
}

/* 📌 Placeholder más visible por defecto */
:deep(.prueba-input .contenedor-input input::placeholder) {
  color: #555; /* Color más oscuro */
  font-weight: bold; /* Negrita para mayor visibilidad */
  opacity: 1; /* Asegura que se vea bien en todos los navegadores */
  transition: color 0.3s ease-in-out;
}

/* Teléfono (select + input) - aumento de tamaño */
.telefono-container {
  gap: 8px;
  width: 130%;
}

.codigo-pais {
  flex: 0 0 85px; /* Antes 75px (+15%) */
  height: 37px;
  font-size: 14px;
  padding: 6px;
}

:deep(.prueba-input.input-telefono .contenedor-input input) {
  height: 37px;
  font-size: 14px;
  padding: 6px 10px;
}

/* ============================
   AJUSTE DEL TAMAÑO DE LAS ETIQUETAS (16px)
=============================== */
:deep(.prueba-input label), 
.form-group > span {
  font-size: 16px; /* Antes 13px */
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

/* ============================
   ESPACIADO EXTRA ENTRE EL ÚLTIMO INPUT Y "SIGUIENTE"
=============================== */
:deep(.primary-button) {
  margin-top: 40px; /* Antes 15px (+espaciado) */
}

/* Efecto de iluminación en el placeholder cuando se hace focus en el input */
:deep(.prueba-input .contenedor-input input::placeholder) {
  color: #999; /* Color base del placeholder */
  transition: color 0.3s ease-in-out;
}

:deep(.prueba-input .contenedor-input input:focus::placeholder) {
  color: #7A40E0; /* Color más oscuro al hacer clic */
  font-weight: bold; /* Se vuelve más grueso */
}

/* Separador más marcado */
.separador {
  margin: 30px auto;
  width: 70%;
  border: 0;
  border-top: 3px solid #7A40E0; /* 💜 Más gruesa y en morado */
  opacity: 0.8; /* 🔥 Aumentamos la opacidad */
}

.error-texto {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

/* Borde rojo cuando hay error */
:deep(.prueba-input input.error) {
  border-color: red;
  box-shadow: 0 0 4px rgba(255, 0, 0, 0.5);
}
</style>


