<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import { ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
import useModalStore from '@/stores/modal';
import { createAisle } from '@/services/aisles';

const modalStore = useModalStore();

const loading = ref(false);
const error = ref('');

const aisle = ref({
  aisle: '',
  description: '',
  sections: '',
  racks: '',
});

const closeModal = () => {
  modalStore.closeModal();
};

const submit = async () => {
  loading.value = true;
  const response = await createAisle(aisle.value);
  if (response) {
    closeModal();
  } else {
    error.value = 'Error al crear el pasillo';
  }

  loading.value = false;
};
</script>

<template>
  <form @submit.prevent="submit">
    <section class="error">
      <p v-if="error">{{ error }}</p>
    </section>
    <fieldset>
      <fieldset>
        <label for="aisle">Número</label>
        <input type="number" name="aisle" id="aisle" placeholder="00" v-bind="aisle.aisle"/>
      </fieldset>
      <fieldset>
        <label for="description">Descripción</label> <br />
        <input type="text"
        name="description"
        id="description"
        placeholder="Paneles"
        v-bind="aisle.description" />
      </fieldset>
    </fieldset>

    <fieldset>
      <fieldset>
        <label for="section">Número de secciones</label>
        <input type="number" name="section" id="section" placeholder="00" v-bind="aisle.sections" />
      </fieldset>
      <fieldset>
        <label for="rack">Número de alturas</label>
        <input type="number" name="rack" id="rack" placeholder="00" v-bind="aisle.racks"/>
      </fieldset>
    </fieldset>
    <fieldset class="buttons">
      <ButtonComponent @click="closeModal" :confirm="true" title="Guardar" />
      <ButtonComponent @click="closeModal" title="Cerrar" />
    </fieldset>
  </form>
</template>

<style scoped>
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
