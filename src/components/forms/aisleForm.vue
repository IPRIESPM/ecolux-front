<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import { ref, onBeforeMount } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';
import { createAisle, getAisleById, updateAisle } from '@/services/aisles';

const modalStore = useModalStore();
const userStore = useUserStore();

const loading = ref(false);
const error = ref('');

const aisle = ref({
  aisle: '',
  description: '',
  nSections: 0,
  nRacks: 0,
  token: userStore.token,
});

const closeModal = () => {
  modalStore.closeModal();
};

const onSubmit = async () => {
  loading.value = true;
  error.value = '';
  if (modalStore.editMode) {
    const response = await updateAisle(aisle.value);
    if (!response) { error.value = 'Error al actualizar el pasillo'; loading.value = false; return; }
  } else {
    const response = await createAisle(aisle.value);
    if (!response) { error.value = 'Error al crear el pasillo'; loading.value = false; return; }
  }
  closeModal();
  loading.value = false;
};

onBeforeMount(async () => {
  if (modalStore.editMode) {
    const data = {
      token: userStore.token,
      pasillo_id: modalStore.id,
    };
    const response = await getAisleById(data);
    if (!response) { error.value = 'Error al obtener el pasillo'; return; }
    const { pasillo_id: id, descripccion, nombre } = response;

    aisle.value = {
      aisle: nombre,
      description: descripccion,
      token: userStore.token,
      id,
    };
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <section class="error">
      <p v-if="error">{{ error }}</p>
    </section>
    <section class="spinner" v-if="loading"></section>
    <section class="data" v-else>
      <fieldset>
        <fieldset>
          <label for="aisle">Nombre</label>
          <input
            type="number"
            name="aisle"
            id="aisle"
            placeholder="00"
            v-model="aisle.aisle"
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
            v-model="aisle.description"
          />
        </fieldset>
      </fieldset>

      <fieldset v-if="!modalStore.editMode">
        <fieldset>
          <label for="nSection">Número de secciones</label>
          <input
            type="number"
            name="nSection"
            id="nSection"
            placeholder="00"
            min="0"
            v-model="aisle.nSections"
          />
        </fieldset>
        <fieldset v-if="!modalStore.editMode">
          <label for="nRack">Número de alturas</label>
          <input
            type="number"
            name="nRack"
            id="nRack"
            min="0"
            placeholder="00"
            v-model="aisle.nRacks"
          />
        </fieldset>
      </fieldset>

      <fieldset class="buttons">
        <ButtonComponent :confirm="true" title="Guardar" />
        <ButtonComponent @click="closeModal" title="Cerrar" />
      </fieldset>
    </section>
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
