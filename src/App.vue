<template>
  <div class="app-container">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
/* Bloque principal */
.app-container {
  width: 100%;
  /* Elimina o modifica: */
  /* min-height: 100vh; */
  /* background-color: #f0f0f0; */
  background-color: #fff; /* o #transparent, si prefieres */
  margin: 0; 
  padding: 0;
}

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

nav a.router-link-exact-active {
  color: #7a20d2;
  text-decoration: underline;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
</style>
