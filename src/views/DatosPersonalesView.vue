<template>
  <div class="ios-wrapper">
    <!-- 🔹 Barra de navegación -->
    <header class="header-bar">
      <button class="btn-atras" @click="irAtras">← Atrás</button>
      <h1 class="titulo-header">Nueva cuenta</h1>
    </header>

    <main class="contenedor-pagina">
      <div class="caja-formulario">
        <!-- 🔹 Datos Personales -->
        <div class="cabecera">
          <h1 class="titulo">Tus datos personales</h1>
          <p class="subtitulo">Para que podamos comunicarnos contigo si es necesario.</p>
        </div>

        <div class="formulario">
          <!-- 📌 Nombre -->
          <PruebaInput 
            label_input="Nombre" 
            placeholder="Introduce tu nombre" 
            type="text"
            v-model="nombre" 
            @input="validarNombre" 
            @blur="validarNombre"
          />
          <span v-if="errorNombre" class="error-texto">⚠ Solo letras (máx. 30 caracteres)</span>

          <!-- 📌 Primer apellido -->
          <PruebaInput 
            label_input="Primer apellido" 
            placeholder="Introduce tu primer apellido" 
            type="text"
            v-model="apellido1" 
            @input="validarApellido1"
            @blur="validarApellido1"
          />
          <span v-if="errorApellido1" class="error-texto">⚠ Solo letras (máx. 30 caracteres)</span>

          <!-- 📌 Segundo apellido -->
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
            <PruebaInput 
              id="telefono" 
              class="input-telefono" 
              placeholder="000000000" 
              type="tel"
              v-model="telefono" 
              @input="telefono = limpiarTelefono(telefono)" 
              @blur="validarTelefono"
            />
          </div>
          <span v-if="errorTelefono" class="error-texto">⚠ Número inválido (9-15 dígitos)</span>
        </div>

        <div class="separador"></div>

        <!-- 🔹 Persona de confianza (Opcional) -->
        <div class="cabecera">
          <h2 class="titulo">Persona de confianza (Opcional)</h2>
          <p class="subtitulo">Le enviaremos notificaciones vía SMS. Si no, deja el formulario en blanco.</p>
        </div>

        <div class="formulario">
          <!-- 📌 Nombre o Alias -->
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
            <PruebaInput 
              class="input-telefono" 
              id="telefonoConfianza" 
              placeholder="000000000" 
              type="tel"
              v-model="telefonoConfianza" 
              @input="telefonoConfianza = limpiarTelefono(telefonoConfianza)" 
              @blur="validarTelefonoConfianza"
            />
          </div>
          <span v-if="errorTelefonoConfianza" class="error-texto">⚠ Número inválido (9-15 dígitos)</span>
        </div>

        <!-- 🔹 Botón Siguiente -->
        <PrimaryButton 
          label="Siguiente" 
          type="button" 
          :disabled="!formularioValido" 
          @click="irAHemosTerminado"
        />
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

// 📌 Variables reactivas para los campos del formulario
const nombre = ref('');
const apellido1 = ref('');
const apellido2 = ref('');
const telefono = ref('');
const codigoPais = ref('+34');
const nombreConfianza = ref('');
const telefonoConfianza = ref('');
const codigoPaisConfianza = ref('+34');

// 📌 Estados de error
const errorNombre = ref(false);
const errorApellido1 = ref(false);
const errorApellido2 = ref(false);
const errorTelefono = ref(false);
const errorNombreConfianza = ref(false);
const errorTelefonoConfianza = ref(false);

// 📌 Función para validar texto (solo letras, entre 2 y 30 caracteres)
const validarTexto = (campo) => {
  const texto = campo.trim();
  return texto.length >= 2 && texto.length <= 30 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(texto);
};

// 📌 Función para limpiar texto (eliminar caracteres inválidos)
const limitarTexto = (campo) => 
  campo.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '').slice(0, 30);

// 📌 Función para limpiar teléfono (solo números y ciertos caracteres)
const limpiarTelefono = (campo) => 
  campo.replace(/[^0-9+\-() ]/g, '').slice(0, 15);

// 📌 Función para validar teléfono principal
const validarTelefono = () => {
  telefono.value = limpiarTelefono(telefono.value);
  const digits = telefono.value.replace(/[^0-9]/g, '');
  errorTelefono.value = digits.length < 9 || digits.length > 15;
};

// 📌 Función para validar teléfono de confianza
const validarTelefonoConfianza = () => {
  telefonoConfianza.value = limpiarTelefono(telefonoConfianza.value);
  const digits = telefonoConfianza.value.replace(/[^0-9]/g, '');
  errorTelefonoConfianza.value = digits.length < 9 || digits.length > 15;
};

// 📌 Funciones individuales de validación
const validarNombre = () => {
  errorNombre.value = !validarTexto(nombre.value);
};

const validarApellido1 = () => {
  errorApellido1.value = !validarTexto(apellido1.value);
};

const validarApellido2 = () => {
  errorApellido2.value = apellido2.value.length > 0 && !validarTexto(apellido2.value);
};

const validarNombreConfianza = () => {
  errorNombreConfianza.value = !validarTexto(nombreConfianza.value);
};

// 📌 Validación general del formulario
const formularioValido = computed(() => 
  !errorNombre.value &&
  !errorApellido1.value &&
  !errorApellido2.value &&
  !errorTelefono.value &&
  telefono.value.replace(/[^0-9]/g, '').length >= 9 &&
  telefono.value.replace(/[^0-9]/g, '').length <= 15
);

// 📌 Función para ir a "Hemos Terminado", pasando el email
const irAHemosTerminado = () => {
  if (formularioValido.value) {
    router.push({ path: "/hemos-terminado", query: { email: email.value } });
  } else {
    console.log('❌ Hay errores en el formulario');
  }
};
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
.contenedor-pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;  /* 🔥 Aseguramos que los elementos se coloquen en columna */
  width: 100%;
  min-height: 100vh; /* 🔥 Asegura que ocupa toda la altura de la pantalla */
  background-color: #f8f9fa;
  padding-bottom: 50px; /* 🔥 Aumentamos el espacio al final */
}
/* ============================
   FORMULARIO EXPANDIDO Y CENTRADO
=============================== */
.caja-formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%; /* 🔥 Se adapta mejor a pantallas pequeñas */
  background: white;
  padding: 40px;  /* 🔥 Reducimos un poco el padding */
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
  height: 40px; /* 🔥 Antes 45px (-10%) */
  width: 80%; /* 🔥 Antes 90% (-10%) */
  padding: 4px 10px; /* 🔥 Menos padding para mejorar visibilidad */
  font-size: 14px;
  border: 1px solid #ccc;
  transition: all 0.3s ease-in-out;
}

/* 📌 Mejoramos el enfoque */
:deep(.prueba-input .contenedor-input input:focus) {
  border-color: #7A40E0;
  box-shadow: 0 0 5px rgba(122, 64, 224, 0.6);
  outline: none;
}

/* 📌 Placeholder más visible */
:deep(.prueba-input .contenedor-input input::placeholder) {
  color: #666;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

/* 📌 Placeholder cambia al hacer focus */
:deep(.prueba-input .contenedor-input input:focus::placeholder) {
  color: #7A40E0;
  font-weight: bold;
}

/* ============================
   TELÉFONO (select + input)
=============================== */
.telefono-container {
  gap: 6px; /* 🔥 Antes 8px (más compacto) */
  width: 100%;
}

/* 📌 Reducimos tamaño del select */
.codigo-pais {
  flex: 0 0 80px; /* 🔥 Antes 85px */
  height: 35px;
  font-size: 13px;
  padding: 4px;
}

/* 📌 Reducimos tamaño del input de teléfono */
:deep(.prueba-input.input-telefono .contenedor-input input) {
  height: 35px;
  font-size: 13px;
  padding: 4px 8px;
}

/* ============================
   AJUSTE DEL TAMAÑO DE LAS ETIQUETAS (16px)
=============================== */
:deep(.prueba-input label), 
.form-group > span {
  font-size: 15px; /* 🔥 Antes 16px (-1px para mejor escalabilidad) */
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

/* ============================
   ESPACIADO EXTRA ENTRE EL ÚLTIMO INPUT Y "SIGUIENTE"
=============================== */
:deep(.primary-button) {
  margin-top: 50px; /* 🔥 Antes 40px (+10px) */
}

/* ============================
   SEPARADOR MÁS MARCADO
=============================== */
.separador {
  margin: 35px auto; /* 🔥 Antes 30px */
  width: 80%; /* 🔥 Antes 70% */
  border-top: 3px solid #7A40E0;
  opacity: 0.9; /* 🔥 Aumentamos opacidad */
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


