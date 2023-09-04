<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import useModalStore from '@/stores/modal';
import LoginComponent from '@/LoginComponent.vue';
import LogOutComponent from '@/LogOutComponent.vue';
import AisleForm from '@/aisleForm.vue';
import SectionForm from '@/SectionForm.vue';
import RackForm from '@/RackForm.vue';
import ReferenceForm from '@/ReferenceForm.vue';

const modalStore = useModalStore();

</script>
<template>
  <section class="modal" v-if="modalStore.showModal">
    <section class="modal-body">
      <section class="modal-header">
        <h2>{{ modalStore.modalText }}</h2>
      </section>
      <section class="modal-main">
        <LoginComponent v-if="modalStore.modalType === 'login'" />
        <LogOutComponent v-if="modalStore.modalType === 'logout'" />
        <AisleForm v-if="modalStore.modalType === 'aisle'" />
        <SectionForm v-if="modalStore.modalType === 'section'" />
        <RackForm v-if="modalStore.modalType === 'rack'" />
        <ReferenceForm v-if="modalStore.modalType === 'reference'" />
      </section>
    </section>
  </section>
</template>
<style scoped>
section.modal {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: grid;
  place-items: center;

  background: #f7f7f7c2;

  section.modal-header {
    display: grid;
    place-items: center;
  }
}
  section.modal-body {
    padding: 18px;
    /* width: 80%;
    height: 80%; */
    background: var(--gray);
    border-radius: var(--border-radius, 6px);
    background: var(--background, #f7f7f7);
    box-shadow: 4px 3px 4px 4px rgba(0, 0, 0, 0.25);
  }

</style>
