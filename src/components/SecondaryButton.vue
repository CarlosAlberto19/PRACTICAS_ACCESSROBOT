<script setup>
defineProps({
  label: String,
  type: String
});
</script>

<template>
  <button :type="type">{{ label }}</button>
</template>

<style scoped>
button {
  background-color: transparent;
  border: 2px solid #8a2be2;
  color: #8a2be2;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #8a2be2;
  color: white;
}
</style>
