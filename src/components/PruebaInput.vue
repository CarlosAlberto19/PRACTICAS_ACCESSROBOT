<script setup>
import { ref, watch } from 'vue';

// 📌 Definir props
const props = defineProps({
  label_input: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  isValid: { type: Boolean, default: false }, // ✅ Check ✔️
  error: { type: String, default: '' } // ✅ Error ❌
});

// 📌 Emitir eventos
const emits = defineEmits(['update:modelValue']);

// 📌 Manejo de visibilidad de contraseña
const inputType = ref(props.type);
watch(() => props.type, (newType) => {
  inputType.value = newType;
});

// 📌 Función para mostrar/ocultar contraseña
const togglePassword = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};
</script>

<template>
  <div class="contenedor-input">
    <!-- ✅ Input con borde rojo si hay error y morado si es válido -->
    <input
      :type="inputType"
      :placeholder="placeholder"
      class="input-estilo"
      :class="{ 'error-borde': error !== '', 'borde-iluminado': isValid }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- ✅ Check morado si el input es válido -->
    <span v-if="isValid" class="icono-check">✔</span>

    <!-- 👁 Icono de ojo para contraseña -->
    <span v-if="type === 'password'" class="material-icons icono-ojo" @click="togglePassword">
      {{ inputType === 'password' ? 'visibility' : 'visibility_off' }}
    </span>
  </div>

  <!-- ✅ Mensaje de error -->
  <p v-if="error" class="mensaje-error">❌ {{ error }}</p>
</template>

<style scoped>
/* 🔥 Contenedor del input */
.contenedor-input {
  position: relative;
  display: flex;
  align-items: center;
}

/* 🔥 Estilo del input */
.input-estilo {
  width: 100%;
  height: 45px;
  padding: 10px 16px;
  font-size: 16px;
  border: 1px solid #bbb;
  border-radius: 8px;
  outline: none;
  transition: border 0.2s ease-in-out;
}

/* ✅ Borde rojo si hay error */
.error-borde {
  border: 2px solid red !important;
  box-shadow: 0 0 8px rgba(255, 0, 0, 0.7);
}

/* ✅ Borde morado si es válido */
.borde-iluminado {
  border: 2px solid #7A40E0 !important;
  box-shadow: 0 0 8px rgba(122, 64, 224, 0.9) !important;
}

/* ✅ Check morado */
.icono-check {
  color: #7A40E0 !important; /* 🔥 Ahora es morado */
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  font-weight: bold;
}

/* 👁 Icono del ojo */
.icono-ojo {
  position: absolute;
  right: 16px;
  cursor: pointer;
  font-size: 22px;
  color: #666;
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
