<template>
  <div class="app-container">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/login-web">Login Web</router-link> <!-- ✅ Nuevo enlace -->
        <router-link to="/about">About</router-link>
      </nav>
    </header>

    <!-- 📌 Aseguramos que todo se distribuye en HORIZONTAL -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* 📌 CONTENEDOR PRINCIPAL */

/* 📌 HEADER Y NAVEGACIÓN */
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
</style>
