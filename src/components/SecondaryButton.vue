<template>
  <button class="secondary-button" @click="handleClick">
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: String
});

const handleClick = () => {
  console.log("Botón secundario clickeado");
};
</script>

<style scoped>
.secondary-button {
  width: 343px;
  height: 50px;
  background: transparent;  /* 🔥 Ahora es transparente */
  border: 2px solid #7A40E0; /* 🔥 Mantiene el borde morado */
  color: #7A40E0; /* 🔥 Color de texto morado */
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.secondary-button:hover {
  background: #7A40E0;
  color: white;
}
</style>
