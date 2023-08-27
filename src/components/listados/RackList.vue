<script setup>
import { ref, onMounted } from 'vue';

import useModalStore from '../../stores/modal';
import useRackStore from '../../stores/racks';

import { getRacksFromAPI, deleteRackFromAPI } from '../../controller/rack';

const rackStore = useRackStore();
const modalStore = useModalStore();

const loading = ref(false);
const errorMessage = ref('');

const getRacks = async () => {
  loading.value = true;

  const response = await getRacksFromAPI();
  if (!response) {
    errorMessage.value = 'Error al cargar las alturas';
    loading.value = false;
    return;
  }
  loading.value = false;
};

const deleteRack = async (id) => {
  loading.value = true;
  const response = await deleteRackFromAPI(id);
  if (response) {
    rackStore.deleteRack(id);
  }
  loading.value = false;
};

const editRack = (id) => {
  modalStore.modalActive = true;
  modalStore.modalType = 'rack';
  modalStore.modalTitle = 'Editar rack';
  modalStore.modalForm = 'edit';

  rackStore.rackSelected = id;
};

onMounted(async () => {
  await getRacks();
});

</script>
<template>
  <ul v-if="!loading">
    <li v-for="rack in rackStore.racks" :key="rack.id">
      <section>
        <h3>{{ rack.id }} - Altura: {{ rack.nombre }}</h3>
        <p>{{ rack.descripccion }}</p>
      </section>
      <fieldset>
        <button class="btn" @click="editRack(rack.id)">Editar</button>
        <button class="btn delete" @click="deleteRack(rack.id)">Eliminar</button>
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
