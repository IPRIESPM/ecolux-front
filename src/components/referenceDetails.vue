<script setup>
import { ref, onBeforeMount } from 'vue';
import { getReferencesFromApi, searchReference } from '../controller/references';

import useModalStore from '../stores/modal';
import useReferenceStore from '../stores/reference';

const referenceStore = useReferenceStore();
const modalStore = useModalStore();

const loading = ref(false);
const referencesList = ref([]);
const errorMessage = ref(false);
const reference = ref('');

const rawReferencesList = ref([]);

const addReference = async () => {
  modalStore.modalActive = true;
  modalStore.modalType = 'reference';
  modalStore.modalTitle = 'Añadir referencia';
  modalStore.modalForm = 'add';
};

const editReference = async () => {
  modalStore.modalActive = true;
  modalStore.modalType = 'reference';
  modalStore.modalTitle = 'Editar referencia';
  modalStore.modalForm = 'edit';

  [referenceStore.referenceSelected] = referencesList.value;
};

const search = async () => {
  errorMessage.value = '';
  referencesList.value = [];
  rawReferencesList.value = [];
  if (reference.value === ' ' || reference.value === '') {
    const response = await getReferencesFromApi();
    rawReferencesList.value = response;
    loading.value = false;
    return;
  }

  loading.value = true;
  const response = await searchReference(reference.value);
  loading.value = false;
  if (!response) {
    errorMessage.value = 'No se ha encontrado la referencia';
    loading.value = false;
  }
  referencesList.value = response;
};

onBeforeMount(async () => {
  loading.value = true;
  const response = await getReferencesFromApi();
  loading.value = false;

  if (!response) {
    errorMessage.value = 'Error al cargar las referencias';
    loading.value = false;
  }
});
</script>

<template>
  <section class="references">
    <form @submit.prevent="search">
      <fieldset class="search">
        <input
          type="search"
          placeholder="Buscar referencia"
          v-model="reference"
          autofocus
          @change="search"
        />
        <input type="submit" value="🔎" />
      </fieldset>
      <fieldset>
        <input type="button" value="añadir" @click="addReference" />
      </fieldset>
    </form>
    <ul v-if="referencesList.length > 0">
      <h2>
        Referencia: {{ referencesList[0].referencia }}
        <input type="button" class="btn delete" value="Eliminar" />
      </h2>

      <li v-for="reference in referencesList" :key="reference.id">

        <a>
          Pasillo: {{ reference.pasillo_nombre }} - Sección: {{ reference.seccion_nombre }} -
          Altura: {{ reference.altura_nombre }}
          <input type="button" class="btn delete" value="Eliminar" />
        </a>
      </li>
    </ul>
    <ul v-if="rawReferencesList.length > 0">
      <h2>Listado de referencias</h2>
      <li v-for="reference in rawReferencesList" :key="reference.id">
        <a> referencia: {{ reference.referencia }} </a>
      </li>
    </ul>
    <section class="error" v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </section>
    <section class="loading" v-else-if="loading">
      <div class="spinner"></div>
      <p>Cargando referencias</p>
    </section>

    <section v-else-if="referencesList.length < 0">No hay referencias</section>
  </section>
</template>

<style scoped>
section.references {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

fieldset.search {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff;
  border-radius: 15px;

  padding: 0.5rem 1rem;
  margin: 0;
}

fieldset.search:focus-within {
  outline: 3px solid orange;
}

input[type='search'] {
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
input[type='search']:focus {
  outline: none;
}

input[type='submit'] {
  border: none;
  font-size: 1rem;
  background: #fff;
  border: none;
  outline: none;
}

section.references form {
  display: flex;
}
</style>
