<script setup>
import { ref, onMounted } from 'vue';

import useModalStore from '../../stores/modal';
import useSeccionStore from '../../stores/section';

import { getAislesFromAPI } from '../../controller/aisles';
import { createSectionFromAPI, getSectionByIdFromAPI, updateSectionFromAPI } from '../../controller/section';

const modalStore = useModalStore();
const sectionStore = useSeccionStore();

const errorMessage = ref('');

const section = ref({
  name: '',
  description: '',
  id: '',
  aisle_id: '',
});
const aisles = ref([]);
const loading = ref(false);

const closeModal = () => {
  modalStore.closeModal();
};

const createSection = async () => {
  loading.value = true;
  const response = await createSectionFromAPI(section.value);
  if (!response) { errorMessage.value = 'Error al crear la sección'; return; }
  if (response.error) { errorMessage.value = response.error; return; }
  sectionStore.addSection(response);
  loading.value = false;
  closeModal();
};

const getAisles = async () => {
  loading.value = true;
  const response = await getAislesFromAPI();
  loading.value = false;
  if (!response) errorMessage.value = 'Error al cargar los pasillos';
  aisles.value = response;
};

const updateSection = async () => {
  loading.value = true;
  const response = await updateSectionFromAPI(section.value);
  if (!response) { errorMessage.value = 'Error al editar la sección'; return; }
  if (response.error) { errorMessage.value = response.error; return; }
  sectionStore.updateSection(response);
  loading.value = false;
  closeModal();
};

const submitForm = async () => {
  if (modalStore.modalForm === 'add') {
    await createSection();
  } else if (modalStore.modalForm === 'edit') {
    await updateSection();
  }
};

onMounted(async () => {
  await getAisles();
  if (modalStore.modalForm === 'edit') {
    loading.value = true;
    const response = await getSectionByIdFromAPI(sectionStore.sectionSelected);
    if (!response) errorMessage.value = 'Error al cargar la sección';

    console.log(response);
    section.value = {
      name: response.nombre,
      description: response.descripccion,
      id: response.id,
      pasillo_id: response.pasillo_id,
    };
    loading.value = false;
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
    >
      Eliminar
    </button>

    <form @submit.prevent="submitForm">
      <fieldset>
        <label for="aisle">Pasillo asignado</label>
        <select name="aisle_id" id="aisle_id" v-model="section.pasillo_id">
          <option v-for="aisle in aisles" :key="aisle.pasillo_id" :value="aisle.pasillo_id">
            Pasillo: {{ aisle.nombre }} - {{ aisle.descripccion }}
          </option>
        </select>
      </fieldset>
      <fieldset>
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="section.name" />

        <label for="description">Descripción</label>
        <textarea id="description" v-model="section.description" rows="5"></textarea>
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

button.delete {
  background: var(--color-cancel);
  color: var(--color-cancel-text);
  border: none;
}

section.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--color-cancel);

  font-weight: bold;
  font-size: 1.5rem;
}
</style>
