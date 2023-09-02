<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import { ref } from 'vue';
import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

const modalStore = useModalStore();
const userStore = useUserStore();

const openForm = (text, type) => {
  modalStore.openModal(text, type);
};

</script>
<template>
    <nav v-if="userStore.admin">
        <a @click="openForm('Nuevo pasillo','aisle')">Pasillos</a>
        <a @click="openForm('Nueva sección','section')">Secciones</a>
        <a @click="openForm('Nueva altura','rack')">Alturas</a>
        <a @click="openForm('Nueva referencia','reference')">Referencias</a>
    </nav>
</template>
<style scoped>
nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 23px;
    background:var(--gray);
    padding: 0rem 3rem;
    height: 48px;
    font-weight: 600;
    + :hover{
        text-decoration: underline;
    }
    a{
        cursor: pointer;
    }
}
</style>
