<script setup>
import { ref, watch } from 'vue';
import PasilloForm from './formularios/PasilloForm.vue';
import PasillosList from './listados/PasillosList.vue';
import SeccionForm from './formularios/SeccionForm.vue';
import useModalStore from '../stores/modal';
import SectionsList from './listados/SeccionList.vue';
import RackForm from './formularios/RackForm.vue';
import RackList from './listados/RackList.vue';
import ReferenceForm from './formularios/referenceForm.vue';

const modalStore = useModalStore();
const modalActive = ref(false);
const modalType = ref('');
const modalTitle = ref('');

const closeModal = () => {
  modalStore.closeModal();
};

watch(() => modalStore.modalType, (newValue) => {
  modalActive.value = newValue;
  modalType.value = modalStore.modalType;
  modalTitle.value = modalStore.modalTitle;
});

</script>

<template>
    <section class="modal" v-if="modalActive">
        <main class="modal_content">
            <header class="modal">
                <h2>{{ modalTitle }}</h2>
                <button class="btn" @click="closeModal">Cerrar</button>
            </header>
            <section class="form">
                <PasilloForm v-if="modalType==='aisle'" />
                <PasillosList v-if="modalType==='listAisle'" />
                <SeccionForm v-if="modalType==='section'" />
                <SectionsList v-if="modalType==='listSection'" />
                <RackForm v-if="modalType==='rack'" />
                <RackList v-if="modalType==='listRack'" />
                <ReferenceForm v-if="modalType==='reference'" />
            </section>
        </main>
    </section>
</template>
<style scoped>
    section.modal{
        position: absolute;
        top: 0;
        left: 0;

        width: 100vw;
        height: 100vh;
        background: #f7f7f7a8;
        z-index: 2;
    }
    main.modal_content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 80%;
        height: 80%;

        background: var(--background-gray);
        border-radius: 1rem;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);

        padding: 1rem;
        overflow: auto;
    }
    header.modal{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
    }
</style>
