<script setup>
import { onBeforeMount, ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

import { getAisles } from '@/services/aisles';
import { getSectionsByAisleId } from '@/services/sections';
import { createRack, getRackById, updateRack } from '@/services/racks';

import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

const modalStore = useModalStore();
const userStore = useUserStore();

const loading = ref(false);
const errorLoading = ref(null);
const aisles = ref([]);
const sections = ref([]);
const error = ref('');

const rack = ref({
  aisle: '',
  section: '',
  name: 0,
  description: '',
  token: userStore.token,
});

const closeModal = () => {
  modalStore.closeModal();
};

const onSubmit = async () => {
  loading.value = true;
  if (modalStore.editMode) {
    const response = await updateRack(rack.value);
    if (!response) { error.value = 'Error al actualizar el rack'; loading.value = false; return; }
  } else {
    const response = await createRack(rack.value);
    if (!response) {
      loading.value = false;
      errorLoading.value = 'Ha ocurrido un error al crear el rack';
      return;
    }
  }
  loading.value = false;
  closeModal();
};

const getSection = async () => {
  loading.value = true;
  const response = await getSectionsByAisleId(rack.value.aisle);
  if (!response) {
    loading.value = false;
    errorLoading.value = 'Ha ocurrido un error al cargar las secciones';
    return;
  }
  sections.value = response;
  loading.value = false;
};

onBeforeMount(async () => {
  loading.value = true;
  if (modalStore.editMode) {
    const data = {
      id: modalStore.id,
    };
    const response = await getRackById(data);
    if (!response) {
      errorLoading.value = 'Error al obtener la sección';
      return;
    }
    const {
      nombre, descripccion, id, seccion_id: section,
    } = response;
    rack.value = {
      aisle: '',
      section,
      name: nombre,
      description: descripccion,
      id,
      token: userStore.token,
    };
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
    <section class="form" @submit.prevent="onSubmit" v-else>
      <fieldset v-if="!modalStore.editMode">
        <fieldset>
          <label for="aisle">Selecciona el pasillo</label>
          <select name="aisle" id="aisle" v-model="rack.aisle" @change="getSection">
            <option value="" disabled selected>Selecciona un pasillo</option>
            <option v-for="aisle in aisles" :key="aisle.pasillo_id" :value="aisle.pasillo_id">
              Pasillo - {{ aisle.nombre }}
            </option>
          </select>
        </fieldset>

        <fieldset v-if="sections.length > 0">
          <label for="section">Selecciona la sección</label>
          <select name="section" id="section" v-model="rack.section">
            <option value="" disabled selected>Selecciona una sección</option>
            <option v-for="section in sections" :key="section.id" :value="section.id">
              Sección - {{ section.nombre }}
            </option>
          </select>
        </fieldset>
      </fieldset>
      <fieldset>
        <fieldset>
          <label for="name">Nombre</label>
          <input type="number" name="name" id="name" placeholder="00" min="0" v-model="rack.name" />
        </fieldset>
        <fieldset>
          <label for="description">Descripción</label> <br />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Paneles"
            v-model="rack.description"
          />
        </fieldset>
      </fieldset>
    </section>
    <fieldset class="buttons">
      <ButtonComponent :confirm="true" title="Guardar" />
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
