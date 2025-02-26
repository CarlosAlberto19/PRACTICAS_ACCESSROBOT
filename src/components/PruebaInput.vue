<script setup>
import { ref, watch } from 'vue';

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
  },
  error: { type: String, default: ''

  }, // ✅ Nueva prop para manejar errores

showCheck: { type: Boolean, default: false } // 🔥 Nueva prop para el check
});

// 📌 Definir evento para actualizar el valor del input
const emits = defineEmits(['update:modelValue']);

// 📌 Estado para manejar la visibilidad del password
const inputType = ref(props.type);
watch(() => props.type, (newType) => {
  inputType.value = newType;
});

// 📌 Si el tipo de input cambia desde el padre, actualizamos inputType
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
        :class="{ 
          'error-borde': error !== '',  // 🔴 Rojo si hay error
          'borde-iluminado': error === '' && modelValue !== '' // 🟣 Morado si está bien
        }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />



      <!-- ✅ Check solo si showCheck es TRUE -->
      <span v-if="type !== 'password' && modelValue !== '' && error === ''" class="icono-check">✔</span>
        
      <!-- 🔥 Icono de ojo para contraseña -->
      <span v-if="type === 'password'" class="material-icons icono-ojo" @click="togglePassword">
        {{ inputType === 'password' ? 'visibility' : 'visibility_off' }}
      </span>
    </div>

    <p v-if="error" class="mensaje-error">❌ {{ error }}</p>
  </div>
</template>

<style scoped>
/* ✅ Contenedor principal */
.prueba-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ✅ Label */
.label-input {
  font-size: 16px;
  font-weight: bold;
  color: #444;
  margin-bottom: 4px;
}

/* ✅ Contenedor de input + icono */
.contenedor-input {
  position: relative;
  display: flex;
  align-items: center;
}

/* ✅ Estilo del input */
.input-estilo {
  width: 100%;
  height: 50px;
  padding: 14px 16px;
  font-size: 16px;
  border: 1px solid #bbb;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

/* ✅ Borde rojo si hay error */
.error-borde {
  border: 2px solid red !important;
  box-shadow: 0 0 8px rgba(255, 0, 0, 0.7);
}

/* ✅ Borde morado si es válido */
.borde-iluminado {
  border: 2px solid #7a40e0 !important;
  box-shadow: 0 0 8px rgba(122, 64, 224, 0.7);
}

/* ✨ EFECTO HOVER cuando el input es válido */
.borde-iluminado:hover {
  box-shadow: 0 0 15px rgba(122, 64, 224, 1);
  transition: box-shadow 0.3s ease-in-out;
}

/* ✅ Check verde cuando el input es válido */
.icono-check {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  font-weight: bold;
  color: green !important;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

/* ✅ Aparece el check cuando el input es válido */
.input-estilo.borde-iluminado + .icono-check {
  opacity: 1;
}

/* 🔥 Icono del ojo */
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

/* ✅ Mensaje de error */
.mensaje-error {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}
</style>