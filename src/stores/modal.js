import { ref } from 'vue';
import { defineStore } from 'pinia';

const useModalStore = defineStore('modal', () => {
  const modalActive = ref(false);
  const modalType = ref('');
  const modalTitle = ref('');
  const modalForm = ref('');

  function closeModal() {
    modalActive.value = false;
    modalType.value = '';
    modalTitle.value = '';
    modalForm.value = '';
  }
  return {
    modalActive,
    modalType,
    modalTitle,
    modalForm,
    closeModal,
  };
});

export default useModalStore;
