import { ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('reference', () => {
  const referencesList = ref([]);
  const referenceSelected = ref(null);
  const referencesSearch = ref('');
  const loading = ref(false);

  const selectReference = (reference) => {
    referenceSelected.value = reference;
  };

  const deleteReference = (id) => {
    referencesList.value = referencesList.value.filter((r) => r.id !== id);
  };

  return {
    referencesList,
    referenceSelected,
    referencesSearch,
    loading,
    selectReference,
    deleteReference,
  };
});
