<script setup>
import { ref, onMounted } from 'vue';

import useModalStore from '../../stores/modal';
import useSeccionStore from '../../stores/section';

import { getAislesFromAPI } from '../../controller/aisles';
import { getSectionsByAisleFromAPI } from '../../controller/section';
import { getRacksBySectionIdFromAPI } from '../../controller/rack';

import * as Controller from '../../controller/references';

const modalStore = useModalStore();
const sectionStore = useSeccionStore();

const loading = ref(false);

const errorMessage = ref('');

const aisles = ref([]);
const aisleSelected = ref('');

const sections = ref([]);
const sectionSelected = ref('');

const racks = ref([]);
const rackSelected = ref('');

const reference = ref({ });

const reset = () => {
  errorMessage.value = '';
  sections.value = [];
  sectionSelected.value = '';
  racks.value = [];
  rackSelected.value = '';
  reference.value = {};
};

const getSectionsByAisle = async () => {
  reset();
  loading.value = true;
  const response = await getSectionsByAisleFromAPI(aisleSelected.value);
  if (!response) { errorMessage.value = 'Error al cargar las secciones'; return; }
  if (response.error) { errorMessage.value = response.error; return; }
  sections.value = response;
  loading.value = false;
};

const getRacksBySection = async () => {
  loading.value = true;
  const response = await getRacksBySectionIdFromAPI(sectionSelected.value);
  if (!response) { errorMessage.value = 'Error al cargar los racks'; return; }
  if (response.error) { errorMessage.value = response.error; return; }
  racks.value = response;
  loading.value = false;
};

const closeModal = () => {
  modalStore.closeModal();
};

const createReference = async () => {
  loading.value = true;

  reference.value = {
    ...reference.value,
    rack: rackSelected.value,
  };
  const response = await Controller.createReferenceFromApi(reference.value);
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

const updateReference = async () => {
  loading.value = true;
  const response = await Controller.updateReferenceFromAPI(reference.value);
  if (!response) { errorMessage.value = 'Error al editar la sección'; return; }
  if (response.error) { errorMessage.value = response.error; return; }
  sectionStore.updateSection(response);
  loading.value = false;
  closeModal();
};

const submitForm = async () => {
  if (modalStore.modalForm === 'add') {
    await createReference();
  } else if (modalStore.modalForm === 'edit') {
    await updateReference();
  }
};

onMounted(async () => {
  await getAisles();
  if (modalStore.modalForm === 'edit') {
    loading.value = true;
    const response = await Controller.getReferencesByIdFromAPI(reference.value.id);
    if (!response) errorMessage.value = 'Error al cargar la sección';
    reference.value = {
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
  {{ aisleSelected }}
  {{ sectionSelected  }}
  {{ rackSelected }}
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
        <select
          name="aisle_id"
          id="aisle_id"
          v-model="aisleSelected"
          @change="getSectionsByAisle(aisleSelected)">
          <option v-for="aisle in aisles" :key="aisle.pasillo_id" :value="aisle.pasillo_id">
            Pasillo: {{ aisle.nombre }} - {{ aisle.descripccion }}
          </option>
        </select>
      </fieldset>

      <fieldset v-if="sections.length >0">
        <label for="aisle">Seccion asignada</label>
        <select
          name="aisle_id"
          id="aisle_id"
          v-model="sectionSelected"
          @change="getRacksBySection(sectionSelected)"
          >
          <option v-for="section in sections" :key="section.id" :value="section.id">
            Sección: {{ section.nombre }} - {{ section.descripccion }}
          </option>
        </select>
      </fieldset>

      <fieldset v-if="racks.length >0">
        <label for="aisle">Altura asignada</label>
        <select
          name="aisle_id"
          id="aisle_id"
          v-model="rackSelected"
          >
          <option v-for="rack in racks" :key="rack.id" :value="rack.id">
            Altura: {{ rack.nombre }} - {{ rack.descripccion }}
          </option>
        </select>
      </fieldset>
      <section v-if="rackSelected">
      <fieldset >
        <label for="reference">Referencia</label>
        <input type="number" id="reference" v-model="reference.reference" />

        <label for="date">Fecha</label>
        <input type="date" id="date" v-model="reference.date" />

        <label for="description">Descripción</label>
        <textarea id="description" v-model="reference.description" rows="5"></textarea>
      </fieldset>

      <fieldset class="btn">
        <input
          class="btn"
          type="submit"
          :value="modalStore.modalForm === 'add' ? 'Guardar' : 'Editar'"
        />
        <button class="btn" type="reset" @click="closeModal">Cancelar</button>
      </fieldset>
    </section>
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
