<template>
  <div class="app-container">
    <!-- 🔹 NAVBAR con gradiente -->
    <header class="navbar">
      <h1 class="titulo-navbar">AccessRobots</h1>
    </header>

    <main>
      <router-view /> <!-- ✅ Aquí se renderizan las vistas -->
    </main>
  </div>
</template>

<script setup>
  // No necesitas importar nada aquí
</script>

<style scoped>
/* 📌 Contenedor principal */
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa; /* 🔹 Color de fondo neutro */
}

/* ✅ NAVBAR con gradiente */
.navbar {
  width: 100%;
  height: 60px; /* 📏 Altura fija */
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 11%, rgba(0,212,255,1) 100%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* 🔥 Sombra para destacar */
}

/* 📌 Ajustes en el contenido principal */
main {
  width: 100%;
  max-width: 1200px; /* 📏 Evita que el contenido sea demasiado ancho */
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px; /* 🔹 Espacio bajo el navbar */
}

/* 📌 Estilos del título en la barra */
.titulo-navbar {
  margin: 0;
}
</style>
