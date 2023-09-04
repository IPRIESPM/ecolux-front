<script setup>
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import useModalStore from '../stores/modal';
import useUserStore from '../stores/user';
import loginInApi from '../services/auth';

const modalStore = useModalStore();
const userStore = useUserStore();

const password = ref('');
const error = ref('');
const loading = ref(false);
const closeModal = () => {
  modalStore.closeModal();
};

const onSumit = async (event) => {
  event.preventDefault();
  error.value = '';
  loading.value = true;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const response = await loginInApi(data);

  if (response) {
    userStore.setToken(response);
    closeModal();
  } else {
    error.value = 'Usuario o contraseña incorrectos';
    password.value = '';
  }
  loading.value = false;
};
</script>
<template>

  <form @submit.prevent="onSumit" >
    <span class="error">{{ error }}</span>
    <section class="spinner" v-if="loading"></section>
    <fieldset v-else>
        <label for="password">Contraseña</label>
        <input type="password" name="password" id="password" v-bind="password"/>
    </fieldset>

    <fieldset class="buttons">
      <ButtonComponent :confirm="true" title="Iniciar" />
      <ButtonComponent title="Cancelar" @click="closeModal"/>
    </fieldset>
  </form>
</template>
<style scoped>

section.spinner {

margin: 0 auto;
}
fieldset.buttons{
    display: flex;
    justify-content: space-between;
}
</style>
