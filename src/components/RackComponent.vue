<script setup>
import { ref, watch, onMounted } from 'vue';

import useSectionsStore from '../stores/section';
import useModalStore from '../stores/modal';
import useRackStore from '../stores/racks';
import ActionButton from './buttons/ActionButton.vue';
import { getSectionsFromAPI } from '../controller/section';
import { getRacksFromAPI } from '../controller/rack';
import LoadingComponent from './LoadingComponent.vue';

const sectionsStore = useSectionsStore();
const racksStore = useRackStore();
const modalStore = useModalStore();

const loading = ref(false);
const errorMessage = ref('');
const racks = ref([]);

const deactivated = ref(false);

const openList = () => {
  if (racks.value.length > 0) {
    modalStore.modalActive = true;
    modalStore.modalType = 'listRack';
    modalStore.modalTitle = 'Listado de alturas';
  }
};

const addRack = () => {
  modalStore.modalActive = true;
  modalStore.modalType = 'rack';
  modalStore.modalTitle = 'Añadir altura';
  modalStore.modalForm = 'add';
};

const getSections = async () => {
  loading.value = true;
  const response = await getSectionsFromAPI();
  if (!response) {
    errorMessage.value = 'Error al cargar las secciones';
    loading.value = false;
  }
  loading.value = false;
};

const getRacks = async () => {
  loading.value = true;
  const response = await getRacksFromAPI();
  if (!response) {
    errorMessage.value = 'Error al cargar las secciones';
    loading.value = false;
  }

  racks.value = response;
  racksStore.racks = response;
  loading.value = false;
};

onMounted(async () => {
  await getSections();
  await getRacks();
});

watch(() => racksStore, async (data) => {
  racks.value = data;
});

watch(() => sectionsStore.sections.length, async (data) => {
  if (data > 0) {
    deactivated.value = false;
  } else {
    deactivated.value = true;
  }
});
</script>

<template>
  <section class="racks">
    <LoadingComponent v-if="loading" />
    <h2 class="button" v-else>
      <span @click="openList">
        Alturas:
        <span v-if="racks.length > 0">{{ racks.length }}</span>
      </span>
      <ActionButton action="add" @click="addRack"/>
    </h2>

  </section>
</template>
<style scoped>
h2.button{
  display: flex;
  gap: 1rem;
}
</style>
