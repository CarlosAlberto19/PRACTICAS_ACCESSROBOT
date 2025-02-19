<template>
  <RouterLink :to="!disabled ? ruta : ''" class="primary-button">
    {{ label }}
  </RouterLink>

</template>

<script setup>
const props = defineProps({
  label: String,
  disabled: Boolean,
  ruta: {
    type: String,
    default: '/' // ✅ Evita valores undefined o vacíos
  }
});
</script>

<style scoped>
.primary-button {
  width: 343px;
  height: 50px;
  background: linear-gradient(90deg, #A078F4, #7A40E0);
  /* 🎨 Diseño moderno */
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

/* 🔒 Botón deshabilitado */
.boton-deshabilitado {
  pointer-events: none;
  /* ❌ Evita clics */
  opacity: 0.5;
  /* 🌫 Visualmente más tenue */
  background: gray;
  /* 📌 Indica estado inactivo */
}
</style>
