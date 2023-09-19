<!-- eslint-disable import/no-unresolved -->
<!-- eslint-disable import/extensions -->
<script setup>
import { ref, onBeforeMount } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

import { getAisles } from '@/services/aisles';
import { createSection, getSectionById, updateSection } from '@/services/sections';

const userStore = useUserStore();
const modalStore = useModalStore();

const aisles = ref([]);
const errorLoading = ref(null);
const loading = ref(false);
const error = ref('');

const section = ref({
  name: '',
  description: '',
  aisle: '',
  nRacks: 0,
  token: userStore.token,
});

const closeModal = () => {
  modalStore.closeModal();
  errorLoading.value = null;
};

const onSubmit = async () => {
  loading.value = true;
  if (modalStore.editMode) {
    const response = await updateSection(section.value);
    if (!response) { error.value = 'Error al actualizar el pasillo'; loading.value = false; return; }
  } else {
    const response = await createSection(section.value);
    if (!response) {
      loading.value = false;
      errorLoading.value = 'Ha ocurrido un error al crear la sección';
      return;
    }
  }
  loading.value = false;
  closeModal();
};

onBeforeMount(async () => {
  loading.value = true;

  if (modalStore.editMode) {
    const data = {
      token: userStore.token,
      id: modalStore.id,
    };
    const response = await getSectionById(data);
    if (!response) {
      errorLoading.value = 'Error al obtener la sección';
      return;
    }
    const { pasillo_id: aisle } = response;
    section.value.aisle = aisle;
    section.value.name = response.nombre;
    section.value.description = response.descripccion;
    section.value.id = response.id;
    loading.value = false;
  } else {
    const response = await getAisles();

    if (!response) {
      loading.value = false;
      errorLoading.value = 'Ha ocurrido un error al cargar los pasillos';
      return;
    }
    aisles.value = response;
    if (aisles.value.length === 0) {
      errorLoading.value = 'No hay pasillos registrados';
    }
    loading.value = false;
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <section class="spinner" v-if="loading"></section>
    <section class="error" v-else-if="errorLoading">{{ errorLoading }}</section>
    <section class="data" v-else>
      <fieldset>
        <fieldset>
          <label for="section">Nombre</label>
          <input
            type="number"
            name="section"
            id="section"
            placeholder="00"
            v-model="section.name"
            min="0"
          />
        </fieldset>
        <fieldset>
          <label for="description">Descripción</label> <br />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Paneles"
            v-model="section.description"
          />
        </fieldset>
      </fieldset>

      <fieldset v-if="!modalStore.editMode">
        <fieldset>
          <label for="rack">Selecciona el pasillo</label>

          <select name="aisle" id="aisle" v-model="section.aisle">
            <option value="" disabled selected>Selecciona un pasillo</option>
            <option v-for="aisle in aisles" :key="aisle.pasillo_id" :value="aisle.pasillo_id">
              Pasillo - {{ aisle.nombre }}
            </option>
          </select>
        </fieldset>
        <fieldset>
          <label for="rack">Número de alturas</label>
          <input
            type="number"
            name="rack"
            id="rack"
            placeholder="00"
            min="0"
            v-model="section.nRacks"
          />
        </fieldset>
      </fieldset>
    </section>
    <fieldset class="buttons">
      <ButtonComponent :confirm="true" title="Guardar" v-if="errorLoading == null" />
      <ButtonComponent @click="closeModal" title="Cerrar" />
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: grid;
  place-items: center;
}
</style>
