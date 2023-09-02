<script setup>

import ButtonComponent from './ButtonComponent.vue';
import useModalStore from '../stores/modal';
import useUserStore from '../stores/user';

const modalStore = useModalStore();
const userStore = useUserStore();

const closeModal = () => {
  modalStore.closeModal();
};

const logOut = () => {
  userStore.logout();
  closeModal();
};

</script>
<template>
    <fieldset class="buttons">
      <ButtonComponent title="Cerrar sesión" :confirm="true" @click="logOut"/>
      <ButtonComponent title="Cancelar" @click="closeModal"/>
    </fieldset>
</template>
<style scoped>
fieldset.buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
