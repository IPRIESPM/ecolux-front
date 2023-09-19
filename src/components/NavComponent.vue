<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
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
        <a @click="openForm('Listado de pasillos','aisle')">Pasillos</a>
        <a @click="openForm('Secciones','section')">Secciones</a>
        <a @click="openForm('Alturas','rack')">Alturas</a>
        <a @click="openForm('Crear nueva referencia','newReference')">Referencias</a>
    </nav>
</template>
<style scoped>
nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 23px;
    height: 48px;
    padding: 0 3rem;
    background:var(--gray);
    font-weight: 700;

    + :hover{
        text-decoration: underline;
    }

    & a{
        cursor: pointer;
    }
}
</style>
