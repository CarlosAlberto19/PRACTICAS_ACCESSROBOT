<script setup>
defineProps({
  msg: String,
  placeholder: String
})
</script>

<template>
    <form action="get">
        <label for="">{{ msg }}</label>
        <input type="text" :placeholder="placeholder">
    </form>
        
</template>
 
<style scoped lang="scss"></style>