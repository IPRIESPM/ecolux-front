import { ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('modal', () => {
  const showModal = ref(false);
  const modalText = ref('');
  const modalType = ref('');
  const editMode = ref(false);
  const id = ref('');

  const closeModal = () => {
    showModal.value = false;
    modalText.value = '';
    modalType.value = '';
    editMode.value = false;
    id.value = '';
  };

  const openModal = (text, type, edit) => {
    modalText.value = text;
    modalType.value = type;
    showModal.value = true;
    editMode.value = edit || false;
  };

  return {
    showModal,
    modalText,
    modalType,
    editMode,
    id,
    closeModal,
    openModal,
  };
});
