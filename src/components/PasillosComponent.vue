<script setup>
import { ref, onMounted, watch } from 'vue';
import useAislesStore from '../stores/aisles';
import { getAislesFromAPI } from '../controller/aisles';
import useModalStore from '../stores/modal';
import ActionButton from './buttons/ActionButton.vue';
import LoadingComponent from './LoadingComponent.vue';

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
      <LoadingComponent v-if="loading" />
        <h2 class="button" v-else>
          <span @click="openList">Pasillos:
            <span v-if="aisles.length >0">{{ aisles.length }}</span>
          </span>
          <ActionButton @click="addAisle" action="add" />
        </h2>

      </section>
</template>

<style scoped>
h2.button{
  display: flex;
  gap: 1rem;
}
</style>
