import { ref } from 'vue';
import { defineStore } from 'pinia';

const useAislesStore = defineStore('aisles', () => {
  const aisles = ref([]);
  const aisleSelected = ref('');
  const updateAisle = (aisle) => {
    const index = aisles.value.findIndex((ais) => ais.pasillo_id === aisle.pasillo_id);
    aisles.value[index] = aisle;
  };
  const deleteAisle = (aisle) => {
    const index = aisles.value.findIndex((ais) => ais.pasillo_id === aisle.pasillo_id);
    aisles.value.splice(index, 1);
  };
  const addAisle = (aisle) => {
    aisles.value.push(aisle);
  };
  return {
    aisles, aisleSelected, updateAisle, deleteAisle, addAisle,
  };
});

export default useAislesStore;
