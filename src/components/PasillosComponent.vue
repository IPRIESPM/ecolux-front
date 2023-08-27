<script setup>
import { ref, onMounted, watch } from 'vue';
import useAislesStore from '../stores/aisles';
import { getAislesFromAPI } from '../controller/aisles';
import useModalStore from '../stores/modal';

const modalStore = useModalStore();
const aisleStore = useAislesStore();
const aisles = ref([]);
const loading = ref(false);
const errorMessage = ref(false);

const addAisle = () => {
  modalStore.modalActive = true;
  modalStore.modalType = 'aisle';
  modalStore.modalTitle = 'Añadir pasillo';
  modalStore.modalForm = 'add';
};

const getAisles = async () => {
  loading.value = true;

  const response = await getAislesFromAPI();
  if (!response) {
    errorMessage.value = 'Error al cargar los pasillos';
    loading.value = false;
    return;
  }
  aisles.value = response;
  aisleStore.aisles = response;
  loading.value = false;
};

const openList = () => {
  if (aisles.value.length > 0) {
    modalStore.modalActive = true;
    modalStore.modalType = 'listAisle';
    modalStore.modalTitle = 'Listado de pasillos';
  }
};

onMounted(async () => {
  await getAisles();
});

watch(() => aisleStore.aisles, async (data) => {
  aisles.value = data;
});

</script>
<template>
    <section class="aisles">
        <h2 class="button">
          <span @click="openList">Pasillos:
            <span v-if="aisles.length >0">{{ aisles.length }}</span>
          </span>
          <button class="btn" @click="addAisle">Añadir</button>
        </h2>
        <section class="loading" v-if="loading">
            <p>Cargando...</p>
        </section>
        <section class="error" v-if="errorMessage">
            <p>{{ errorMessage }}</p>
        </section>
        <section class="noData" v-else-if=" aisles.length===0">
            <p>No se encontraron pasillos</p>
        </section>
      </section>
</template>

<style scoped>
  li {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
