<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import { ref } from 'vue';
import useModalReference from '@/stores/references';
import useUserStore from '@/stores/user';
import useModalStore from '@/stores/modal';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { deleteReferenceRackFromApi } from '@/services/references';

const userStore = useUserStore();
const modalStore = useModalStore();
const referenceStore = useModalReference();
const error = ref('');

const openModal = () => {
  const text = 'Editar referencia';
  const type = 'referenceForm';
  modalStore.openModal(text, type, true);
};

const deleteReferenceRack = async (id) => {
  const checkConfirm = window.confirm('¿Estas seguro de borrar esta referencia?');
  if (!checkConfirm) {
    return;
  }

  const data = {
    id,
    token: userStore.token,
  };
  referenceStore.loading = true;
  const response = await deleteReferenceRackFromApi(data);
  if (!response) {
    error.value = 'Ha ocurrido un error al borrar la referencia';
  } else {
    error.value = '';
    referenceStore.deleteReference(id);
  }
  referenceStore.loading = false;
};
</script>
<template>
  <section class="search-results">
    <section class="spinner" v-if="referenceStore.loading"></section>
    <section class="reference" v-if="referenceStore.referenceSelected">
      <p>Referencia {{ referenceStore.referenceSelected.referencia }}</p>
      <ButtonComponent
              title="Editar"
              :confirm="true"
              @click="openModal()"
            />
            <ButtonComponent
              title="Borrar"
              :delete="true"
              v-if="referenceStore.referencesSearch.length === 0"
              @click="deleteReference(reference.id_referencia_altura)"
            />
    </section>
    <section class="wrapper" v-if="referenceStore.referencesSearch.length > 0">
      <section class="header">
        <a>Fecha <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a>Pasillo <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a>Sección <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a>Altura <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a v-if="userStore.admin">Opciones</a>
      </section>
      <section class="body">
        <article v-for="reference in referenceStore.referencesSearch" :key="reference.id">
          <a>{{ reference.fecha_creacion ? reference.fecha_creacion : '-' }}</a>
          <a>{{ reference.pasillo_nombre }}</a>
          <a>{{ reference.seccion_nombre }}</a>
          <a>{{ reference.altura_nombre }}</a>
          <a class="button" v-if="userStore.admin">
            <ButtonComponent
              title="Borrar"
              :delete="true"
              @click="deleteReferenceRack(reference.id_referencia_altura)"
            />
          </a>
        </article>
      </section>
    </section>
  </section>
</template>

<style scoped>
section.search-results {
  margin-top: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  section {
    margin-bottom: 2rem;
  }
  section.wrapper {

    text-align: center;
  }
}

section.header,
article {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

section.header a {
  font-weight: 700;
}

a.button{
  display: flex;
  gap: 1rem;
}
</style>
