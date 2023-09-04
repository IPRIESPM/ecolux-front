<!-- eslint-disable import/no-unresolved -->
<!-- eslint-disable import/extensions -->
<script setup>
import { ref, onBeforeMount } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

import { getAisles } from '@/services/aisles';
import { createSection } from '@/services/sections';

const userStore = useUserStore();
const modalStore = useModalStore();

const aisles = ref([]);
const errorLoading = ref(null);
const loading = ref(false);

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
  const response = await createSection(section.value);
  if (!response) {
    loading.value = false;
    errorLoading.value = 'Ha ocurrido un error al crear la sección';
    return;
  }
  loading.value = false;
  closeModal();
};

onBeforeMount(async () => {
  loading.value = true;
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

      <fieldset>
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
fieldset {
  display: flex;
  align-items: center;
  justify-content: center;
  height: min-content;
  gap: 12px;

  fieldset {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
}
</style>
