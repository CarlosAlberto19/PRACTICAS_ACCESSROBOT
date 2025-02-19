<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

// 📌 Definir props con valores por defecto
const props = defineProps({
  label_input: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
});

// 📌 Definir evento para actualizar el valor del input
const emits = defineEmits(['update:modelValue']);

// 📌 Estado para manejar la visibilidad del password (se actualiza dinámicamente)
const inputType = ref(props.type);

// 📌 Si el tipo de input cambia desde el padre, actualizamos `inputType`
watch(() => props.type, (newType) => {
  inputType.value = newType;
});

// 📌 Función para mostrar/ocultar la contraseña
const togglePassword = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};
</script>

<template>
  <div class="prueba-input">
    <label v-if="label_input" class="label-input">{{ label_input }}</label>
    <div class="contenedor-input">
      <input
        :type="inputType"
        :placeholder="placeholder"
        class="input-estilo"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
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
  gap: 10px; /* 🔥 Aumentamos separación entre label e input */
}

/* Label */
.label-input {
  font-size: 16px;  /* 🔥 Más grande para mejor lectura */
  font-weight: bold;
  color: #444; /* 🔥 Un poco más oscuro */
  margin-bottom: 4px; /* 🔥 Separación con el input */
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
  height: 50px; /* 🔥 Más alto para mejor UX */
  padding: 14px 16px;
  font-size: 16px;
  border: 1px solid #bbb;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  transition: border 0.2s ease-in-out;
}

/* Efecto hover y focus */
.input-estilo:hover,
.input-estilo:focus {
  border-color: #7a40e0; /* 🔥 Color del tema */
}

/* Icono del ojo */
.icono-ojo {
  position: absolute;
  right: 16px;
  cursor: pointer;
  font-size: 22px;
  color: #666;
  transition: color 0.2s;
}
.icono-ojo:hover {
  color: #333;
}
</style>
