<template>
  <div class="app-container">
    <!-- Menú global -->
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/login-web">Login Web</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/crear-cuenta">Nueva Cuenta</router-link>
      </nav>
    </header>

    <!-- Aquí se carga cada vista -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Estilos del menú global */
header {
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  text-align: center;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  text-decoration: none;
  color: #8a2be2;
  font-weight: bold;
}
</style>
