<template>
  <!-- Envoltorio general para el “estilo iOS” -->
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

    <!-- Contenido principal de la página (tu formulario) -->
    <main class="contenedor-pagina">
      <div class="caja-formulario">
        <!-- DATOS PERSONALES -->
        <div class="cabecera">
          <h1 class="titulo">Tus datos personales</h1>
          <p class="subtitulo">Para que podamos comunicarnos contigo si es necesario.</p>
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
          <label class="form-group">
            <span>Teléfono</span>
            <div class="telefono-container">
              <select v-model="codigoPais" class="codigo-pais">
                <option value="+34">ES +34</option>
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
              </select>
              <PruebaInput
                class="input-reducido input-telefono"
                id="telefono"
                label_input=""
                placeholder="000000000"
                type="tel"
                v-model="telefono"
              />
            </div>
          </label>
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
/* 1) Permite scroll y une las barras */
.ios-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* min-height para que ocupe al menos la pantalla completa */
  min-height: 100vh; 
  background-color: #f2f2f2;
  /* Permite scroll vertical si el contenido es más grande que la pantalla */
  overflow-y: auto; 
  box-sizing: border-box;
}

/* Barra de estado (hora, señal, wifi, batería) */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  background-color: #8357E5;
  color: #fff;
  padding: 0 12px;
  /* Quita bordes redondeados para que se una con la barra siguiente */
  border-radius: 0;
  margin: 0; 
}

.status-time {
  font-size: 14px;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-signal,
.icon-wifi,
.icon-battery {
  font-size: 14px;
}

/* Barra superior morada */
.header-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px; 
  background-color: #8357E5;
  color: #fff;
  padding: 0 16px;
  /* No margen entre la status bar y la header bar */
  margin: 0;
  border-radius: 0;
}

.btn-atras {
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.flecha {
  font-size: 18px;
  transform: translateY(1px);
}

.titulo-header {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

/* Contenido principal */
.contenedor-pagina {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1; 
  width: 100%;
  /* Quita color de fondo para que se vea el gris */
  background-color: transparent;
  padding: 20px 0;
  box-sizing: border-box;
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

/* Formulario */
.formulario {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

/* Label + contenedor de select+input */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* Tlf Container */
.telefono-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.codigo-pais {
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  flex: 0 0 100px;
}

/* Error de validación */
.error-texto {
  color: red;
  font-size: 12px;
  margin-top: -10px;
}

/* Separador */
.separador {
  margin: 30px 0;
  border-top: 2px solid #ddd;
}

.cabecera {
  text-align: center;
  margin-bottom: 20px;
}

.titulo {
  font-size: 36px;
  font-weight: bold;
  margin: 0;
}

.subtitulo {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.input-reducido {
  font-size: 12px; /* Reduce el tamaño de la fuente en un 40% */
  padding: 5px; /* Reduce el padding en un 40% */
}
</style>