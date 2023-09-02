import { ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('modal', () => {
  const showModal = ref(false);
  const modalText = ref('');
  const modalType = ref('');

  const closeModal = () => {
    showModal.value = false;
    modalText.value = '';
    modalType.value = '';
  };

  const openModal = (text, type) => {
    modalText.value = text;
    modalType.value = type;
    showModal.value = true;
  };

  return {
    showModal,
    modalText,
    modalType,
    closeModal,
    openModal,
  };
});
