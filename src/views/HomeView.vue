<template>
  <div class="home-container">
    <h1>Bienvenido a AccessRobot</h1>
    <p>Selecciona una opción para continuar:</p>

    <div class="botones">
      <router-link to="/login">
        <button class="boton">Iniciar Sesión</button>
      </router-link>

      <router-link to="/crear-cuenta">
        <button class="boton">Crear Nueva Cuenta</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  padding: 40px;
}

.botones {
  margin-top: 20px;
}

.boton {
  background-color: #8a2be2;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.boton:hover {
  background-color: #6a1bbf;
}
</style>
