<script setup>
import { ref } from 'vue';

defineProps({
  label_input: String,
  type: String,
  placeholder: String,
});

// Estado para manejar la visibilidad
const inputType = ref("password");

const togglePassword = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
</script>

<template>
  <div class="prueba-input">
    <label for="">{{ label_input }}</label>

    <div class="contenedor-input">
      <input :type="type === 'password' ? inputType : type" :placeholder="placeholder">
      <span class="material-icons icono-ojo" v-if="type === 'password'" @click="togglePassword">
        {{ inputType === 'password' ? 'visibility' : 'visibility_off' }}
      </span>
    </div>
  </div>
</template>

<style scoped>
/* 📌 CONTENEDOR PRINCIPAL */
.prueba-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 📌 CONTENEDOR INPUT + ICONO */
.contenedor-input {
  position: relative;
  display: flex;
  align-items: center;
}

/* 📌 INPUT */
.contenedor-input input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  padding-right: 40px; /* Espacio para el icono */
}

/* 📌 ICONO DEL OJO */
.icono-ojo {
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 22px;
  color: #666;
}

.icono-ojo:hover {
  color: #333;
}
</style>
