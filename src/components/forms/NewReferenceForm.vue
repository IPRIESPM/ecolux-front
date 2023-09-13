<script setup>
import { onBeforeMount, ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';
import useReferenceStore from '@/stores/references';
import { getAisles } from '@/services/aisles';
import { getSectionsByAisleId } from '@/services/sections';
import { getRacksBySectionId } from '@/services/racks';
import { createReferenceFromApi } from '@/services/references';

const userStore = useUserStore();
const modalStore = useModalStore();
const referenceStore = useReferenceStore();

const loading = ref(false);
const aisles = ref([]);
const sections = ref([]);
const racks = ref([]);
const errorLoading = ref(null);

const reference = ref({
  aisle: '',
  section: '',
  rack: '',
  name: '',
  description: '',
  departure: '',
  token: userStore.token,
});

const closeModal = () => {
  modalStore.closeModal();
};

const getSections = async () => {
  loading.value = true;
  const response = await getSectionsByAisleId(reference.value.aisle);
  if (!response) {
    loading.value = false;
    errorLoading.value = 'Ha ocurrido un error al cargar las secciones';
    return;
  }

  sections.value = response;
  loading.value = false;
};

const getRacks = async () => {
  loading.value = true;
  const response = await getRacksBySectionId(reference.value.section);
  if (!response) {
    loading.value = false;
    errorLoading.value = 'Ha ocurrido un error al cargar las secciones';
    return;
  }
  racks.value = response;
  loading.value = false;
};

const onSubmit = async () => {
  loading.value = true;
  const response = await createReferenceFromApi(reference.value);
  if (!response) {
    loading.value = false;
    errorLoading.value = 'Ha ocurrido un error al crear la sección';
    return;
  }
  const newReference = {
    detalles: reference.value.description,
    referencia: reference.value.name,
  };
  referenceStore.addReference(newReference);
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
    <section class="form" v-else>
      <fieldset>
        <fieldset>
          <label for="aisle">Selecciona el pasillo</label>
          <select name="aisle" id="aisle" v-model="reference.aisle" @change="getSections">
            <option value="" disabled selected>Selecciona un pasillo</option>
            <option v-for="aisle in aisles" :key="aisle.pasillo_id" :value="aisle.pasillo_id">
              Pasillo - {{ aisle.nombre }}
            </option>
          </select>
        </fieldset>
        <fieldset v-if="sections.length > 0">
          <label for="section">Selecciona la sección</label>
          <select name="section" id="section" v-model="reference.section" @change="getRacks">
            <option value="" disabled selected>Selecciona una sección</option>
            <option v-for="section in sections" :key="section.id" :value="section.id">
              Sección - {{ section.nombre }}
            </option>
          </select>
        </fieldset>
        <fieldset v-if="racks.length > 0">
          <label for="racks">Selecciona la altura</label>
          <select name="racks" id="rack" v-model="reference.rack">
            <option value="" disabled selected>Selecciona una altura</option>
            <option v-for="rack in racks" :key="rack.id" :value="rack.id">
              Altura - {{ rack.nombre }}
            </option>
          </select>
        </fieldset>
      </fieldset>
      <fieldset v-if="reference.rack || reference.rack.length > 0">
        <fieldset>
          <label for="departure">Partida</label> <br />
          <input
            type="text"
            name="departure"
            id="departure"
            class="small-input"
            v-model="reference.departure"
          />
        </fieldset>
        <fieldset>
          <label for="date">Fecha</label> <br />
          <input
            type="date"
            name="date"
            id="date"
            v-model="reference.date"
          />
        </fieldset>
        <fieldset>
          <label for="aisle">Referencia</label>
          <input
            type="text"
            name="reference"
            id="reference"
            class="small-input"
            placeholder="00"
            min="0"
            v-model="reference.name"
          />
        </fieldset>
        <fieldset>
          <label for="description">Descripción</label> <br />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Paneles"
            v-model="reference.description"
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

  input[type='number'] {
    width: 50px;
  }
  input.small-input {
    width: 80px;
  }
}
</style>
