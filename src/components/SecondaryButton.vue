<script setup>
const props = defineProps({
  label: String,
  type: String,
  disabled: Boolean
});

const handleClick = () => {
  console.log("Botón clickeado");
};
</script>

<template>
  <button 
    :type="props.type" 
    :disabled="props.disabled" 
    @click="handleClick"
    class="secondary-button"
  >
    <span>{{ props.label }}</span> 
  </button>
</template>


<style scoped>
.secondary-button {
  width: 343px;
  height: 50px;
  background: transparent;
  border: 2px solid #8a2be2;
  color: #8a2be2;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;  /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
  text-align: center;
  position: relative; /* Evita desbordamientos raros */
  overflow: hidden; /* Evita que el texto se salga */
}

.secondary-button span {
  display: block; /* Asegura que el texto no se salga */
}


.secondary-button:hover {
  background: #8a2be2;
  color: white;
}

.secondary-button:disabled {
  background: gray;
  border-color: gray;
  cursor: not-allowed;
  color: white; /* Asegura que el texto sea visible en disabled */
}
</style>
