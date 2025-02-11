<script setup>
defineProps({
  label: String, // Texto que acompañará al checkbox
  modelValue: Boolean // Para vincularlo con v-model
})
</script>

<template>
  <label class="checkbox-container">
    <input type="checkbox" :checked="modelValue">
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #28c76f; /* Color verde */
}
</style>
