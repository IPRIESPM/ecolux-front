<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import useModalStore from '@/stores/modal';
import LoginComponent from '@/components/forms/LoginComponent.vue';
import LogOutComponent from '@/components/LogOutComponent.vue';

import AisleForm from '@/components/forms/AisleForm.vue';
import SectionForm from '@/components/forms/SectionForm.vue';
import RackForm from '@/components/forms/RackForm.vue';
import ReferenceForm from '@/components/forms/ReferenceForm.vue';

import AisleList from './lists/aisleList.vue';
import SectionsList from './lists/SectionsList.vue';
import RacksList from './lists/RacksList.vue';

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

        <AisleForm v-if="modalStore.modalType === 'aisleForm'" />
        <SectionForm v-if="modalStore.modalType === 'sectionForm'" />
        <RackForm v-if="modalStore.modalType === 'rackForm'" />
        <ReferenceForm v-if="modalStore.modalType === 'reference'" />

        <AisleList v-if="modalStore.modalType === 'aisle'" />
        <SectionsList v-if="modalStore.modalType === 'section'" />
        <RacksList v-if="modalStore.modalType === 'rack'" />

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
