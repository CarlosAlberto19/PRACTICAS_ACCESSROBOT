<template>
  <RouterLink
    :to="!disabled ? ruta : ''" 
    class="primary-button"
    :class="{ 'boton-deshabilitado': disabled }"
  >
    {{ props.label }}
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  label: String,
  type: String,
  disabled: Boolean,
  ruta: String
});
</script>

<style scoped>
.primary-button {
  width: 343px;
  height: 50px;
  background: linear-gradient(90deg, #A078F4, #7A40E0); /* 🔥 Ajuste del gradiente */
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
  text-decoration: none;
}

/* 🔥 Estilo para cuando el botón está deshabilitado */
.boton-deshabilitado {
  pointer-events: none; /* 🔥 Evita que el usuario haga clic */
  opacity: 0.5; /* 🔥 Visualmente más tenue */
  background: gray; /* 🔥 Para que se vea claramente deshabilitado */
}
</style>
