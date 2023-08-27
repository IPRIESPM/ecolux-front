import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('racks', () => {
  const racks = ref([]);
  const rackSelected = ref(null);
  const addRack = (rack) => {
    racks.value.push(rack);
  };
  const deleteRack = (rack) => {
    const index = racks.value.findIndex((rac) => rac.id === rack.id);
    racks.value.splice(index, 1);
  };
  const updateRack = (rack) => {
    const index = racks.value.findIndex((rac) => rac.id === rack.id);
    racks.value[index] = rack;
  };
  return {
    racks, rackSelected, addRack, deleteRack, updateRack,
  };
});
