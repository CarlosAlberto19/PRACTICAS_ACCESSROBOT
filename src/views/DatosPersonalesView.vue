<template>
  <!-- Envoltorio general estilo iOS -->
  <div class="ios-wrapper">
    <!-- Barra de estado (hora, señal, wifi, batería) -->
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span class="icon-signal">📶</span>
        <span class="icon-wifi">📡</span>
        <span class="icon-battery">🔋</span>
      </div>
    </div>

    <!-- Barra superior morada con botón 'Atrás' y título centrado -->
    <header class="header-bar">
      <button class="btn-atras" @click="volverAtras">
        <span class="flecha">&larr;</span>
        Atrás
      </button>
      <h1 class="titulo-header">Nueva cuenta</h1>
    </header>

    <!-- Contenido principal de la página (formulario) -->
    <main class="contenedor-pagina">
      <div class="caja-formulario">
        <!-- DATOS PERSONALES -->
        <div class="cabecera">
          <h1 class="titulo">Tus datos personales</h1>
          <p class="subtitulo">
            Para que podamos comunicarnos contigo si es necesario.
          </p>
        </div>

        <div class="formulario">
          <!-- Campo Nombre -->
          <PruebaInput
            class="input-reducido"
            label_input="Nombre"
            placeholder="Introduce tu nombre"
            type="text"
            v-model="nombre"
          />
          <span v-if="errorNombre" class="error-texto">⚠ Muestra de error</span>

          <!-- Campo Apellido 1 -->
          <PruebaInput
            class="input-reducido"
            label_input="Primer apellido"
            placeholder="Introduce tu primer apellido"
            type="text"
            v-model="apellido1"
          />

          <!-- Campo Apellido 2 -->
          <PruebaInput
            class="input-reducido"
            label_input="Segundo apellido (Opcional)"
            placeholder="Introduce tu segundo apellido"
            type="text"
            v-model="apellido2"
          />

          <!-- Teléfono -->
          <div class="telefono-container">
            <select v-model="codigoPais" class="codigo-pais">
              <option value="+34">ES +34</option>
              <option value="+1">US +1</option>
              <option value="+44">UK +44</option>
            </select>
            <PruebaInput
              id="telefono"
              class="input-telefono"
              label_input=""
              placeholder="000000000"
              type="tel"
              v-model="telefono"
            />
          </div>
        </div>

        <div class="separador"></div>

        <!-- PERSONA DE CONFIANZA -->
        <div class="cabecera">
          <h2 class="titulo">Persona de confianza (Opcional)</h2>
          <p class="subtitulo">
            Le enviaremos notificaciones vía SMS. Si no, deja el formulario en blanco.
          </p>
        </div>

        <div class="formulario">
          <!-- Nombre o Alias -->
          <PruebaInput
            class="input-reducido"
            label_input="Nombre o Alias"
            placeholder="Introduce el nombre"
            type="text"
            v-model="nombreConfianza"
          />

          <!-- Teléfono de confianza -->
          <label class="form-group">
            <span>Teléfono de confianza</span>
            <div class="telefono-container">
              <select v-model="codigoPaisConfianza" class="codigo-pais">
                <option value="+34">ES +34</option>
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
              </select>
              <PruebaInput
                class="input-reducido input-telefono"
                id="telefonoConfianza"
                label_input=""
                placeholder="000000000"
                type="tel"
                v-model="telefonoConfianza"
              />
            </div>
          </label>
        </div>

        <!-- Botón de acción final -->
        <PrimaryButton label="Siguiente" type="button" @click="validarDatos" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PruebaInput from '@/components/PruebaInput.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const nombre = ref('')
const apellido1 = ref('')
const apellido2 = ref('')
const telefono = ref('')
const codigoPais = ref('+34')

const nombreConfianza = ref('')
const telefonoConfianza = ref('')
const codigoPaisConfianza = ref('+34')

const errorNombre = ref(false)

const validarDatos = () => {
  if (!nombre.value) {
    errorNombre.value = true
  } else {
    errorNombre.value = false
    console.log('Datos guardados correctamente')
  }
}

const volverAtras = () => {
  console.log('Volver atrás')
}
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
  border-radius: 12px;
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
  font-size: 16px;
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
  width: 100%;
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
  gap: 10px;
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

/* 🔥 Sube un poco el input para que quede alineado */
/* 🔧 Ajuste extra en la alineación del input */
:deep(.prueba-input.input-telefono .contenedor-input input) {
  height: 48px;
  padding: 10px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  margin: 0;
  line-height: 1.2;
  margin-top: -11px; /* 🔥 Lo subimos un poco más */
}
/* ============================
   LABELS EN NEGRITA
=============================== */
:deep(.prueba-input label) {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}
.form-group > span {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

/* ============================
   BOTÓN "SIGUIENTE"
=============================== */
:deep(.primary-button) {
  margin-top: 30px; /* Baja el botón para darle espacio */
}

:deep(.prueba-input .contenedor-input input) {
  height: 50px; /* 🔥 Reduce el tamaño (antes 48px) */
  width: 85%  ; /* 🔥 Ajusta el ancho */
  padding: 6px 12px; /* 🔥 Ajusta el padding */
  font-size: 14px; /* 🔥 Reduce el tamaño de la fuente */
}


</style>
