<script setup>
import { ref, onMounted } from 'vue';
import useModalStore from '../../stores/modal';
import useAislesStore from '../../stores/aisles';
import {
  createAisleOnAPI, getAisleByIdFromAPI, deleteAisleOnAPI, updateAisleOnAPI,
} from '../../controller/aisles';

const modalStore = useModalStore();
const aisleStore = useAislesStore();

const errorMessage = ref('');
const aisle = ref({
  name: '',
  description: '',
  id: '',
});
const loading = ref(false);

const closeModal = () => {
  modalStore.closeModal();
  aisleStore.aisleSelected = '';
};

const createAisle = async () => {
  loading.value = true;

  const response = await createAisleOnAPI(aisle.value);

  if (response) {
    aisleStore.addAisle(response);
    closeModal();
  }

  loading.value = false;
};

const updateAisle = async () => {
  loading.value = true;

  const response = await updateAisleOnAPI(aisle.value);

  if (response) {
    aisleStore.updateAisle(response);
    closeModal();
  }

  loading.value = false;
};

const deleteAisle = async () => {
  loading.value = true;
  const response = await deleteAisleOnAPI(aisle.value.id);

  if (response) {
    aisleStore.deleteAisle(aisle);
    closeModal();
  }

  loading.value = false;
};

const submitForm = async () => {
  if (modalStore.modalForm === 'add') {
    await createAisle();
  } else if (modalStore.modalForm === 'edit') {
    await updateAisle();
  } else if (modalStore.modalForm === 'delete') {
    await deleteAisle();
  }
};

onMounted(async () => {
  if (modalStore.modalForm === 'edit') {
    loading.value = true;

    const response = await getAisleByIdFromAPI(aisleStore.aisleSelected);
    loading.value = false;

    if (!response) errorMessage.value = 'No se encontró el pasillo';

    aisle.value.name = response.nombre;
    aisle.value.description = response.descripccion;
    aisle.value.id = response.pasillo_id;
  }
});
</script>
<template>
  <section class="error" v-if="errorMessage">
    <p>{{ errorMessage }}</p>
  </section>
  <section class="loading" v-else-if="loading">
    <div class="spinner"></div>
    <p>Cargando ...</p>
  </section>
  <section class="forms" v-else>
    <button
    class="btn delete"
    type="reset"
    @click="deleteAisle"
    v-if="modalStore.formType === 'edit'"
    >Eliminar</button>

    <form @submit.prevent="submitForm">
      <fieldset>
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="aisle.name" />

        <label for="description">Descripción</label>
        <textarea id="description" v-model="aisle.description" rows="5"></textarea>
      </fieldset>

      <fieldset class="btn">
        <input
          class="btn"
          type="submit"
          :value="modalStore.modalForm === 'add' ? 'Guardar' : 'Editar'"
        />
        <button class="btn" type="reset" @click="closeModal">Cancelar</button>

      </fieldset>
    </form>
  </section>
</template>

<style scoped>
input[type='text'] {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}
fieldset {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  border: none;
}

label {
  font-weight: bold;
}

fieldset.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

button[type='reset'] {
  background: var(--color-background-soft);
  color: var(--color-text);
  border: none;
}

button.delete{
  background: var(--color-cancel);
  color: var(--color-cancel-text);
  border: none;
}
</style>
