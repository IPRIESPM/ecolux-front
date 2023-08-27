<script setup>
import { ref, onMounted } from 'vue';
import useAislesStore from '../../stores/aisles';
import useModalStore from '../../stores/modal';
import { getAislesFromAPI, deleteAisleOnAPI } from '../../controller/aisles';

const aisleStore = useAislesStore();
const modalStore = useModalStore();

const loading = ref(false);
const errorMessage = ref('');

const getAisles = async () => {
  loading.value = true;

  const response = await getAislesFromAPI();
  if (!response) {
    errorMessage.value = 'Error al cargar los pasillos';
    loading.value = false;
    return;
  }
  aisleStore.aisles = response;
  loading.value = false;
};

const deleteAisle = async (id) => {
  loading.value = true;
  const response = await deleteAisleOnAPI(id);

  if (response) {
    aisleStore.deleteAisle(id);
  }

  loading.value = false;
};
const editAisle = (id) => {
  modalStore.modalActive = true;
  modalStore.modalType = 'aisle';
  modalStore.modalTitle = 'Editar pasillo';
  modalStore.modalForm = 'edit';

  aisleStore.aisleSelected = id;
};
onMounted(async () => {
  await getAisles();
});
</script>
<template>
  <ul v-if="!loading">
    <li v-for="aisle in aisleStore.aisles" :key="aisle.pasillo_id">
      <section>
        <h3>Pasillo: {{ aisle.nombre }}</h3>
        <p>{{ aisle.descripccion }}</p>
      </section>
      <fieldset>
        <button class="btn" @click="editAisle(aisle.pasillo_id)">Editar</button>
        <button class="btn delete" @click="deleteAisle(aisle.pasillo_id)">Eliminar</button>
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
