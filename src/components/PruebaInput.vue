<script setup>
import { ref } from 'vue';

defineProps({
  label_input: String,
  type: String,
  placeholder: String,
});

// Estado para manejar la visibilidad del password
const inputType = ref('password');
const togglePassword = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};
</script>

<template>
  <div class="prueba-input">
    <label>{{ label_input }}</label>
    <div class="contenedor-input">
      <input
        :type="type === 'password' ? inputType : type"
        :placeholder="placeholder"
        class="input-estilo"
      />
      <span
        v-if="type === 'password'"
        class="material-icons icono-ojo"
        @click="togglePassword"
      >
        {{ inputType === 'password' ? 'visibility' : 'visibility_off' }}
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.prueba-input {
  display: flex;
  flex-direction: column;
  gap: 8px; /* Espacio entre label e input */
}

/* Label */
.prueba-input label {
  font-size: 14px;
  color: #666;
}

/* Contenedor de input + icono */
.contenedor-input {
  position: relative;
  display: flex;
  align-items: center;
}

/* Estilo del input */
.input-estilo {
  width: 100%;
  height: 48px; /* Altura consistente para web */
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
}

/* Icono del ojo */
.icono-ojo {
  position: absolute;
  right: 16px;
  cursor: pointer;
  font-size: 20px;
  color: #666;
}
.icono-ojo:hover {
  color: #333;
}
</style>