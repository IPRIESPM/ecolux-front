import { ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('reference', () => {
  const reference = ref('');
  const referenceList = ref([]);
  const referenceSelected = ref(null);

  return { reference, referenceList, referenceSelected };
});
