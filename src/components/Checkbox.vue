<script setup>
defineProps({
  label: String, // Texto que acompañará al checkbox
  modelValue: Boolean // Para vincularlo con v-model
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <label class="checkbox-container">
    <input 
      type="checkbox" 
      :checked="modelValue" 
      @change="emit('update:modelValue', $event.target.checked)" 
    />
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
