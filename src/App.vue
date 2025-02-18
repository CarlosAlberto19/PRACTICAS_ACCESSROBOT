<template>
  <div class="app-container">
    <!-- 📌 Menú de Navegación Global -->
    <header>
      <nav>
        <!-- Enlaces a las vistas principales -->
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/login-web">Login Web</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/crear-cuenta">Nueva Cuenta</router-link>
        <router-link to="/recuperar-clave">Recuperar Clave</router-link> <!-- ✅ Nuevo enlace -->
      </nav>
    </header>

    <!-- 📌 Contenedor dinámico donde se cargan las vistas -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* 📌 Estilos del menú de navegación */
header {
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa; /* Color de fondo claro */
  text-align: center;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espacio entre los enlaces */
}

nav a {
  text-decoration: none;
  color: #8a2be2; /* Color morado para los enlaces */
  font-weight: bold;
}

/* 📌 Agregamos efecto hover para mejorar la usabilidad */
nav a:hover {
  text-decoration: underline;
}
</style>
