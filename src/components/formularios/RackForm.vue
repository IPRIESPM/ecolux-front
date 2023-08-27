<script setup>
import { ref, onMounted } from 'vue';

import useModalStore from '../../stores/modal';
import useRackStore from '../../stores/racks';

import { getSectionsByAisleFromAPI } from '../../controller/section';
import { createRackFromAPI, getRackByIdFromAPI, updateRackFromAPI } from '../../controller/rack';
import { getAislesFromAPI } from '../../controller/aisles';

const modalStore = useModalStore();
const racksStore = useRackStore();

const errorMessage = ref('');

const rack = ref({
  id: '',
  name: '',
  description: '',
  section_id: '',
});

const aisles = ref([]);
const aisleSelected = ref('');

const sections = ref([]);
const loading = ref(false);

const closeModal = () => {
  modalStore.closeModal();
};

const createRack = async () => {
  loading.value = true;
  const response = await createRackFromAPI(rack.value);
  if (!response) { errorMessage.value = 'Error al crear la sección'; return; }
  if (response.error) { errorMessage.value = response.error; return; }
  racksStore.addRack(response);
  loading.value = false;
  closeModal();
};

const getSectionsByAisle = async () => {
  loading.value = true;
  const response = await getSectionsByAisleFromAPI(aisleSelected.value);
  loading.value = false;
  if (!response) errorMessage.value = 'Error al cargar las secciones';
  sections.value = response;
};

const getAisles = async () => {
  loading.value = true;
  const response = await getAislesFromAPI();
  loading.value = false;
  if (!response) errorMessage.value = 'Error al cargar los pasillos';
  aisles.value = response;
};

const updateRack = async () => {
  loading.value = true;
  const response = await updateRackFromAPI(rack.value);
  if (!response) { errorMessage.value = 'Error al editar a la altura'; return; }
  if (response.error) { errorMessage.value = response.error; return; }
  racksStore.updateRack(response);
  loading.value = false;
  closeModal();
};

const submitForm = async () => {
  if (modalStore.modalForm === 'add') {
    await createRack();
  } else if (modalStore.modalForm === 'edit') {
    await updateRack();
  }
};

onMounted(async () => {
  await getAisles();
  if (modalStore.modalForm === 'edit') {
    loading.value = true;
    const response = await getRackByIdFromAPI(racksStore.rackSelected);
    if (!response) errorMessage.value = 'Error al cargar la sección';
    rack.value = {
      name: response.nombre,
      description: response.descripccion,
      id: response.id,
      section_id: response.seccion_id,
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
        {{ aisles }}
        {{ aisleSelected  }}
        <label for="aisle">Pasillo asignado</label>
        <select
        @change="getSectionsByAisle"
          name="aisle_id"
          id="aisle_id"
          v-model="aisleSelected">
          <option v-for="aisle in aisles" :key="aisle.id" :value="aisle.pasillo_id">
            Pasillo: {{ aisle.nombre }} - {{ aisle.descripccion }}
          </option>
        </select>
      </fieldset>

      <fieldset  v-if="sections.length >0">
        <label for="section">Sección asignada</label>
        <select name="seccion_id" id="seccion_id" v-model="rack.section_id">
          <option v-for="section in sections" :key="section.id" :value="section.id">
            Seccion: {{ section.nombre }} - {{ section.descripccion }}
          </option>
        </select>
      </fieldset>

      <fieldset>
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="rack.name" />
        <label for="description">Descripción</label>
        <textarea id="description" v-model="rack.description" rows="5"></textarea>
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
