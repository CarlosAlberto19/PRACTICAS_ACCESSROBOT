<template>
  <div class="app-container">
    <main>
      <router-view /> <!-- ✅ Aquí se renderizan las vistas -->
    </main>
  </div>
</template>

<script setup>
  // No necesitas importar nada aquí
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}
</style>
