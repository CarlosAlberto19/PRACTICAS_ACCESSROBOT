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
  min-height: 100vh;
  background-color: #f8f9fa;
 
}

</style>