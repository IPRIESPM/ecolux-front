<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <section class="loading">
    <div class="spinner"></div>
    <h2>{{ props.text }}</h2>
  </section>
</template>

<style scoped>
section.loading{
  display: flex;
  gap: 1rem;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 5px solid #ccc;
  border-top-color: #333;
  animation: spin 1s ease infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
