<script setup>
import { onBeforeMount, ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import useModalStore from '@/stores/modal';
import useReferenceStore from '@/stores/references';
import useUserStore from '@/stores/user';
import { getReferenceByIdFromApi, updateReferenceFromApi } from '@/services/references';

const modalStore = useModalStore();
const referenceStore = useReferenceStore();
const userStore = useUserStore();

const loading = ref(false);
const errorLoading = ref(null);

const reference = ref({
  reference: '',
  details: '',
  id: '',
  date: new Date().toISOString('es').slice(0, 10),
  token: userStore.token,
});

const closeModal = () => {
  modalStore.closeModal();
};

const onSubmit = async () => {
  loading.value = true;
  const response = await updateReferenceFromApi(reference.value);
  if (!response) {
    loading.value = false;
    errorLoading.value = 'Ha ocurrido un error al actualizar la referencia';
    return;
  }
  referenceStore.referenceSelected = response;
  loading.value = false;
  closeModal();
};

onBeforeMount(async () => {
  loading.value = true;
  const response = await getReferenceByIdFromApi(referenceStore.referenceSelected.id);
  if (!response) {
    loading.value = false;
    errorLoading.value = 'Ha ocurrido un error al cargar la referencia';
    return;
  }
  reference.value.id = response.id;
  reference.value.reference = response.referencia;
  reference.value.details = response.detalles;
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
            placeholder="00"
            min="0"
            v-model="reference.reference"
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
}
</style>
