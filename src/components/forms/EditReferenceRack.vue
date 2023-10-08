<script setup>
import { onBeforeMount, ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

import {
  getReferenceRackByIdFromApi,
  updateReferenceRackFromApi,
} from '@/services/references';

import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';
import useReferenceStore from '@/stores/references';

const modalStore = useModalStore();
const referenceStore = useReferenceStore();
const userStore = useUserStore();

const loading = ref(false);
const errorLoading = ref(null);

const reference = ref({
  reference: '',
  details: '',
  stock: 0,
  id: '',
  referenceRack: '',
  date: new Date().toISOString('es').slice(0, 10),
  token: userStore.token,
});

const closeModal = () => {
  modalStore.closeModal();
  referenceStore.referenceSelected = null;
};

const onSubmit = async () => {
  loading.value = true;
  const data = { ...reference.value };
  const response = await updateReferenceRackFromApi(data);

  if (!response) {
    loading.value = false;
    errorLoading.value = 'Ha ocurrido un error al actualizar la referencia';
    return;
  }

  loading.value = false;
  referenceStore.updateReferenceRack(data);
  closeModal();
};

onBeforeMount(async () => {
  loading.value = true;
  const data = {
    id: referenceStore.referenceSelected,
    token: userStore.token,
  };
  const response = await getReferenceRackByIdFromApi(data);
  if (!response) {
    loading.value = false;
    errorLoading.value = 'Ha ocurrido un error al cargar la referencia';
    return;
  }

  reference.value.id = response.referencia_id;
  reference.value.reference = response.referencia;
  reference.value.referenceRack = response.id_referencia_altura;
  reference.value.batch = response.partida;
  reference.value.details = response.detalles;
  reference.value.stock = response.cantidad || 0;
  reference.value.date = response.fecha_creacion.slice(0, 10) || new Date().toISOString('es').slice(0, 10);
  loading.value = false;
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <section class="spinner" v-if="loading"></section>
    <section class="error" v-else-if="errorLoading">{{ errorLoading }}</section>
    <section class="form" v-else>
      <fieldset v-if="reference">
        <fieldset>
          <label for="reference">Referencia</label>
          <input
            type="text"
            name="reference"
            id="reference"
            placeholder="5100"
            min="0"
            v-model="reference.reference"
          />
        </fieldset>
        <fieldset>
          <label for="date">Fecha</label>
          <input type="date" name="date" id="date" min="0" v-model="reference.date" />
        </fieldset>
        <fieldset>
          <label for="entry">Partida</label>
          <input
            type="text"
            name="batch"
            id="batch"
            placeholder="00"
            min="0"
            v-model="reference.batch"
          />
        </fieldset>
        <fieldset>
          <label for="stock">Stock</label>
          <input
            type="text"
            name="stock"
            id="stock"
            placeholder="0"
            min="0"
            v-model="reference.stock"
          />
        </fieldset>

        <fieldset>
          <label for="description">Descripción</label> <br />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Paneles"
            v-model="reference.details"
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

fieldset input[type='number'] {
  width: 50px;
}
</style>
