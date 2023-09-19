<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  confirm: {
    type: Boolean,
    required: false,
    default: false,
  },
  delete: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
<template>
    <button class="confirm" v-if="props.confirm">{{ props.title }}</button>
    <button class="delete" v-else-if="props.delete"> {{ props.title }}</button>
    <button class="cancel" v-else> {{ props.title }}</button>
</template>
<style scoped>
button {
    padding: 10px 24px;
    border-radius: 6px;
    border: 1px solid rgba(66 66 66 / 30%);
    color: var(--color-text);
    font-weight: 500;
    box-shadow: 1px 1px 0 0 rgba(0 0 0 / 25%);
    cursor: pointer;

    &.confirm {
        background: var(--blue);
        color: var(--color-text-light);
    }

    &.cancel {
        color: var(--color-text);
    }
    &.delete {
        background: var(--red);
        color: var(--color-text-light);
    }
}
</style>
