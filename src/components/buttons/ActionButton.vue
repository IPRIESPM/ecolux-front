<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button class="add action-btn" v-if="props.action == 'add'">
    <span>+</span>
  </button>

  <button class="remove action-btn" v-else>
    <span>-</span>
  </button>
</template>

<style scoped>
.action-btn {
  height: 34px;
  width: 34px;

  font-size: 2rem;
  margin: 0;
  padding: 0;

  display: grid;
  place-items: center;

  border-radius: 13px;
  outline: none;
  border: none;

  &:hover {
    filter: brightness(1.1);
    transition: filter 0.2s ease-in-out;
  }
  span {
    display: block;
    transform: translate(0px, -8.5px);
    cursor: pointer;
  }
}

.add {
  background: var(--background-color-confirm);
  color: var(--color-confirm);
}

.remove {
  background: var(--background-color-cancel);
  color: var(--color-cancel);
}
</style>
