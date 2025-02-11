<script setup>
import { ref } from 'vue'; // Importamos ref para manejar estados
import Prueba from '@/components/Prueba.vue';
import Checkbox from '@/components/Checkbox.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';  

const aceptaTerminos = ref(false); // Estado del checkbox
</script>

<template>
  <div class="login-container">
    <p>Login</p>

    <Prueba msg="email" placeholder="Escribe aquí tu correo electrónico" />
    <Prueba msg="contraseña" placeholder="Escribe aquí tu contraseña" />

    <!-- Checkbox (Aseguramos que emite correctamente el evento para actualizar `aceptaTerminos`) -->
    <Checkbox 
      label="Acepto los Términos y condiciones de uso" 
      :modelValue="aceptaTerminos" 
      @update:modelValue="aceptaTerminos = $event"
    />

    <!-- Botón Siguiente (se desactiva si no se acepta el checkbox) -->
    <PrimaryButton label="Siguiente" type="submit" :disabled="!aceptaTerminos" />

    <p>¿Ya tienes cuenta?</p>
    <!-- Botón Secundario -->
    <SecondaryButton label="Ir a iniciar sesión" type="button" />
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
</style>
