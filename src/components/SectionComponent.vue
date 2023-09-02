<script setup>
import { ref, watch, onMounted } from 'vue';

import useSectionsStore from '../stores/section';
import useModalStore from '../stores/modal';
import useAislesStore from '../stores/aisles';
import { getSectionsFromAPI } from '../controller/section';
import ActionButton from './buttons/ActionButton.vue';
import LoadingComponent from './LoadingComponent.vue';

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
    <LoadingComponent v-if="loading" />

    <h2 class="button" v-else>
      <span @click="openList">
        Secciones:
        <span v-if="sections.length > 0">{{ sections.length }}</span>
      </span>
      <ActionButton @click="addSection" action="add" />
    </h2>
  </section>
  <FooterComponent />
</template>

<style scoped>
h2.button{
  display: flex;
  gap: 1rem;
}</style>
