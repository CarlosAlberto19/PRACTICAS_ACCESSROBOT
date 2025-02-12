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

<script setup>
import botonIcon from '../assets/images/Boton.png'; // Asegúrate de que la ruta es correcta

const props = defineProps({
  label: String,
  type: String,
  disabled: Boolean
});

const handleClick = () => {
  console.log("Botón clickeado");
};
</script>

<style scoped>
.primary-button {
  width: 343px;
  height: 50px;
  background: linear-gradient(90deg, #A078F4, #7A40E0); /* Ajuste del gradiente */
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>