<template>
  <div class="contenedor">
    <h1 class="titulo">AccessRobot</h1>
    <img :src="arturoImg" alt="Robot" class="imagen-robot" />

    <h2 class="subtitulo">¡Hemos terminado!</h2>
    <p class="descripcion">
      Ya puedes entrar en Access Robots, aunque
      <strong>para reservar acompañamientos es necesario que verifiques tu cuenta.</strong>
    </p>

    <p class="mensaje-email">
      Te hemos enviado un email a <strong>%emailUsuario%</strong>.
      Por favor, revisa también la carpeta de SPAM.
    </p>

    <!-- Sección de video -->
    <div class="video">
      <img :src="iconoVideoImg" alt="Icono Video" class="icono-video" />
      <a href="#" class="link-video">Mostrar vídeo en LSE</a>
    </div>

    <PrimaryButton label="Entrar" type="button" @click="irAHome" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PrimaryButton from '@/components/PrimaryButton.vue';

// ✅ Importación correcta de imágenes usando `new URL()`
const arturoImg = new URL('@/assets/images/ARturo.png', import.meta.url).href;
const iconoVideoImg = new URL('@/assets/images/icono-video.png', import.meta.url).href;

const router = useRouter();

const irAHome = () => {
  router.push('/');
};
</script>

<style scoped>
.contenedor {
  text-align: center;
  padding: 30px;
}

.titulo {
  font-size: 28px;
  font-weight: bold;
}

.imagen-robot {
  width: 150px;
  margin: 20px 0;
}

.subtitulo {
  font-size: 22px;
  font-weight: bold;
  margin: 10px 0;
}

.descripcion {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.mensaje-email {
  font-size: 16px;
  color: #666;
}

/* Sección de video */
.video {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
}

.icono-video {
  width: 25px; /* Tamaño ajustado */
}

.link-video {
  color: #7A40E0;
  text-decoration: underline;
  cursor: pointer;
}

.primary-button {
  margin-top: 20px;
}
</style>
