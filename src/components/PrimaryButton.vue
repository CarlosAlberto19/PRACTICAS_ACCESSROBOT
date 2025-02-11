<script setup>
const props = defineProps({
  label: String,  // Texto del botón
  type: String,   // Tipo de botón (ej: 'submit', 'button')
  disabled: Boolean  // Para deshabilitarlo si es necesario
})

const handleClick = () => {
  console.log("Botón clickeado"); // Aquí puedes poner tu lógica
}
</script>

<template>
  <button 
    :type="props.type" 
    :disabled="props.disabled" 
    @click="handleClick"
    class="primary-button"
  >
    {{ props.label }}
  </button>
</template>

<style scoped>
.primary-button {
  width: 295px;
  height: 50px;
  background: transparent;
  border: 2px solid #8a2be2; /* Mismo color del SecondaryButton */
  color: #8a2be2;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-button:hover {
  background: linear-gradient(90deg, #A78BFA, #7C3AED);
  color: white;
}

.primary-button:disabled {
  background: gray;
  border-color: gray;
  cursor: not-allowed;
}
</style>
