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

  const deleteReferenceRack = (id) => {
    referencesList.value = referencesList.value.filter((r) => r.id !== id);
    referencesSearch.value = referencesSearch.value.filter((r) => r.id !== id);
  };

  const deleteReference = (id) => {
    deleteReferenceRack(id);
    referenceSelected.value = null;
  };

  const addReference = (reference) => {
    referencesList.value.push(reference);
  };
  const updateReferenceSearch = (updateReferences) => {
    referencesSearch.value = referencesSearch.value.map((reference) => {
      if (reference.id === updateReferences.id) {
        return updateReferences;
      }
      return reference;
    });
  };

  return {
    referencesList,
    referenceSelected,
    referencesSearch,
    loading,
    selectReference,
    deleteReference,
    deleteReferenceRack,
    addReference,
    updateReferenceSearch,
  };
});
