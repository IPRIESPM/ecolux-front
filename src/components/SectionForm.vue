<!-- eslint-disable import/no-unresolved -->
<!-- eslint-disable import/extensions -->
<script setup>
import ButtonComponent from './ButtonComponent.vue';
import useModalStore from '@/stores/modal';

const modalStore = useModalStore();

const closeModal = () => {
  modalStore.closeModal();
};
</script>

<template>
  <form>
    <fieldset>
      <fieldset>
        <label for="aisle">Número</label>
        <input type="number" name="aisle" id="aisle" placeholder="00" />
      </fieldset>
      <fieldset>
        <label for="description">Descripción</label> <br />
        <input type="text" name="description" id="description" placeholder="Paneles" />
      </fieldset>
    </fieldset>

    <fieldset>
      <fieldset>
        <label for="rack">Selecciona el pasillo</label>
        <select name="aisle" id="aisle">
          <option value="">Pasillo - 1</option>
        </select>
      </fieldset>
      <fieldset>
        <label for="rack">Número de alturas</label>
        <input type="number" name="rack" id="rack" placeholder="00" />
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
