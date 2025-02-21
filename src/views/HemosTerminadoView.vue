<template>
  <div class="contenedor">
    <div class="caja">
      <h1 class="titulo">AccessRobot</h1>
      <img :src="arturoImg" alt="Robot" class="imagen-robot animacion-cabeza" />

      <h2 class="subtitulo">¡Hemos terminado!</h2>
      <p class="descripcion">
        Ya puedes entrar en Access Robots, aunque
        <strong>para reservar acompañamientos es necesario que verifiques tu cuenta.</strong>
      </p>

      <!-- ✅ Email dinámico insertado -->
      <p class="mensaje-email">
        Te hemos enviado un email a <strong>{{ emailUsuario }}</strong>.
        Por favor, revisa también la carpeta de SPAM.
      </p>

      <div class="video">
        <img :src="iconoVideoImg" alt="Icono de video" class="icono-video" />
      </div>

      <div class="boton-container">
        <PrimaryButton label="Entrar" type="button" @click="irAHome" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import PrimaryButton from '@/components/PrimaryButton.vue';

// ✅ Obtener la información de la ruta actual
const route = useRoute();
const router = useRouter();

// ✅ Extraer el email desde la URL o mostrar "correo no disponible"
const emailUsuario = computed(() => route.query.email?.trim() || "correo no disponible");

// ✅ Importación correcta de imágenes usando `new URL()`
const arturoImg = new URL('@/assets/images/ARturoEnamorado.png', import.meta.url).href;
const iconoVideoImg = new URL('@/assets/images/small@2x.png', import.meta.url).href;

// ✅ Función para ir a Home
const irAHome = () => {
  router.push('/');
};
</script>

<style scoped>
/* ✅ Centrar todo el contenido en la pantalla */
.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
}

/* ✅ Caja centrada con diseño responsivo */
.caja {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ✅ Ajustes de tamaño y márgenes */
.titulo {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.imagen-robot {
  width: 100px;
  margin: 15px 0;
}

/* ✅ Animación de la cabeza del robot */
@keyframes subirBajar {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animacion-cabeza {
  animation: subirBajar 2s ease-in-out infinite;
}

.subtitulo {
  font-size: 22px;
  font-weight: bold;
  margin: 10px 0;
}

.descripcion {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
}

.mensaje-email {
  font-size: 16px;
  color: #666;
}

/* ✅ Sección de video alineada */
.video {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
}

.icono-video {
  width: 180px;
}

/* ✅ Centrar el botón */
.boton-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

/* ✅ Diseño responsivo para móviles */
@media (max-width: 600px) {
  .caja {
    padding: 30px;
    max-width: 90%;
  }

  .titulo {
    font-size: 24px;
  }

  .subtitulo {
    font-size: 20px;
  }

  .descripcion, .mensaje-email {
    font-size: 14px;
  }

  .imagen-robot {
    width: 80px;
  }
}
</style>
