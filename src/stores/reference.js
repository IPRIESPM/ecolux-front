import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useReferenceStore = defineStore('reference', () => {
  const reference = ref('')
  const referenceList = ref([])
  const setReference = (ref) => {
    referenceList.value.push(ref)
  }

  return { reference, referenceList, setReference }
})
