<script setup>
import { ref, watch, onMounted } from 'vue';

import useSectionsStore from '../stores/section';
import useModalStore from '../stores/modal';
import useAislesStore from '../stores/aisles';
import { getSectionsFromAPI } from '../controller/section';

const sectionsStore = useSectionsStore();
const aisleStore = useAislesStore();
const modalStore = useModalStore();

const loading = ref(false);
const errorMessage = ref('');
const sections = ref([]);

const deactivated = ref(false);

const openList = () => {
  if (sections.value.length > 0) {
    modalStore.modalActive = true;
    modalStore.modalType = 'listSection';
    modalStore.modalTitle = 'Listado de secciones';
  }
};

const addSection = () => {
  modalStore.modalActive = true;
  modalStore.modalType = 'section';
  modalStore.modalTitle = 'Añadir sección';
  modalStore.modalForm = 'add';
};

const getSections = async () => {
  loading.value = true;
  const response = await getSectionsFromAPI();
  if (!response) {
    errorMessage.value = 'Error al cargar las secciones';
    loading.value = false;
  }

  sections.value = response;
  sectionsStore.sections = response;
  loading.value = false;
};

onMounted(async () => {
  await getSections();
});

watch(() => sectionsStore, async (data) => {
  sections.value = data;
});

watch(() => aisleStore.aisles.length, async (data) => {
  if (data > 0) {
    deactivated.value = false;
  } else {
    deactivated.value = true;
  }
});
</script>

<template>
  <section class="sections">
    <h2 class="button">
      <span @click="openList">
        Secciones:
        <span v-if="sections.length > 0">{{ sections.length }}</span>
      </span>
      <button v-if="!deactivated" class="btn" @click="addSection">Añadir</button>
    </h2>
    <section class="loading" v-if="loading">
      <p>Cargando...</p>
    </section>
  </section>
</template>
