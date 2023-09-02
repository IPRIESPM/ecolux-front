<script setup>
import { ref, onMounted } from 'vue';

import useModalStore from '../../stores/modal';
import useSectionsStore from '../../stores/section';

import { getSectionsFromAPI, deleteSectionFromAPI } from '../../controller/section';

const sectionStore = useSectionsStore();
const modalStore = useModalStore();

const loading = ref(false);
const errorMessage = ref('');

const getSections = async () => {
  loading.value = true;

  const response = await getSectionsFromAPI();
  if (!response) {
    errorMessage.value = 'Error al cargar las secciones';
    loading.value = false;
    return;
  }
  loading.value = false;
};

const deleteSection = async (id) => {
  loading.value = true;
  const response = await deleteSectionFromAPI(id);
  if (response) {
    sectionStore.deleteSection(id);
  }
  loading.value = false;
};

const editSection = (id) => {
  modalStore.modalActive = true;
  modalStore.modalType = 'section';
  modalStore.modalTitle = 'Editar sección';
  modalStore.modalForm = 'edit';

  sectionStore.sectionSelected = id;
};

onMounted(async () => {
  await getSections();
});
</script>
<template>
  <ul v-if="!loading">
    <li v-for="section in sectionStore.sections" :key="section.id">
      <section>
        <h3>Sección: {{ section.nombre }}</h3>
        <p>{{ section.descripccion }}</p>
      </section>
      <fieldset>
        <button class="btn" @click="editSection(section.id)">Editar</button>

        <button class="btn delete" @click="deleteSection(section.id)">Eliminar</button>
      </fieldset>
    </li>
  </ul>
  <section class="loading" v-else>
    <p>Cargando...</p>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background: var(--color-background-mute);
}

fieldset {
  display: flex;
  gap: 1rem;
  border: none;
}

button.delete {
  background: var(--color-cancel);
}
</style>
