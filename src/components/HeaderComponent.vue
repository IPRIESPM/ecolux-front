<script setup>
import {
  ref, onMounted, watch,
} from 'vue';
import useModalStore from '../stores/modal';
import useUserStore from '../stores/user';

const modalStore = useModalStore();
const userStore = useUserStore();

const admin = ref(false);

const checkAdmin = () => {
  const { token } = userStore;
  if (token) {
    admin.value = true;
  } else {
    admin.value = false;
  }
};

const openModal = () => {
  checkAdmin();
  if (admin.value) {
    modalStore.openModal('Cerrar sesión', 'logout');
    return;
  }
  modalStore.openModal('Iniciar sesión', 'login');
};

onMounted(() => {
  checkAdmin();
});

watch(() => userStore.admin, () => {
  checkAdmin();
});

</script>
<template>
    <header>
        <img src="/logo_cabecera_fijo.png" alt="Logo">
        <section class="user" @click="openModal">
            <font-awesome-icon :icon="['fas', 'circle-user']" />
            {{ admin ? 'Admin' : 'Iniciar sesión' }}
        </section>
    </header>
</template>
<style scoped>
header {
    padding: 2rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 12px solid var(--orange);
    background:var(--black-secondary);
    color: var(--color-text-light);

   & section.user{
        display: flex;
        gap: 1.3rem;
        justify-content: center;
        align-items: center;
        font-size: var(--step-1);
        cursor: pointer;
    }
}

</style>
