<!-- eslint-disable no-alert -->
<script setup>
import { onBeforeMount, ref } from 'vue';
import { getSectionsByAisleId, deleteSectionFromApi } from '@/services/sections';
import { getAisles } from '@/services/aisles';
import ButtonComponent from '@/components/ButtonComponent.vue';
import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

const userStore = useUserStore();
const modalStore = useModalStore();

const loading = ref(false);
const error = ref('');
const sections = ref([]);
const aisles = ref([]);
const aisleSelected = ref('');
const openEditForm = (text, type, id) => {
  modalStore.openModal(text, type, true);
  modalStore.id = id;
};

const getSection = async () => {
  loading.value = true;
  const response = await getSectionsByAisleId(aisleSelected.value);
  if (!response) {
    loading.value = false;
    error.value = 'Error al cargar las secciones';
    return;
  }
  sections.value = response;
  loading.value = false;
};

const openForm = (text, type) => {
  modalStore.openModal(text, type);
};
const closeModal = () => {
  modalStore.closeModal();
};

const deleteSection = async (id) => {
  const checkConfirm = window.confirm('¿Estas seguro de borrar esta sección?');
  if (!checkConfirm) {
    return;
  }

  const data = {
    id,
    token: userStore.token,
  };
  loading.value = true;
  const response = await deleteSectionFromApi(data);
  if (!response) {
    error.value = 'Error al borrar el pasillo';
    loading.value = false;
    return;
  }
  loading.value = false;
  sections.value = sections.value.filter((section) => section.id !== id);
};

onBeforeMount(async () => {
  loading.value = true;
  const response = await getAisles();
  if (!response) {
    loading.value = false;
    return;
  }
  aisles.value = response;
  loading.value = false;
});
</script>

<template>
  <section class="pasillos">
    <section class="spinner" v-if="loading"></section>
    <section v-else>

      <a class="buttons header">
        <fieldset>
          <label for="aisle">Selecciona el pasillo</label>
          <select name="aisle" id="aisle" @change="getSection" v-model="aisleSelected">
            <option value="" disabled selected>Selecciona un pasillo</option>
            <option v-for="aisle in aisles" :key="aisle.pasillo_id" :value="aisle.pasillo_id">
              Pasillo - {{ aisle.nombre }}
            </option>
          </select>
        </fieldset>
        <ButtonComponent
          @click="openForm('Nueva seccion', 'sectionForm')"
          :confirm="true"
          title="Crear"
        />
        <ButtonComponent @click="closeModal" title="Cerrar" />
      </a>

      <section class="error" v-if="error">{{ error }}</section>
      <section class="header">
        <a>Sección</a>
        <a>Descripccion</a>
        <a>Opciones</a>
      </section>
      <article v-for="section in sections" :key="section.id">
        <a>{{ section.nombre }}</a>
        <a>{{ section.descripccion ? section.descripccion : '-' }}</a>
        <a class="buttons">
          <ButtonComponent
            title="Editar"
            @click="openEditForm('Editar sección', 'sectionForm', section.id)"
            :confirm="true"
          />
          <ButtonComponent title="Borrar"  @click="deleteSection(section.id)" :delete="true" />
        </a>
      </article>
    </section>
  </section>
</template>
<style scoped>
section.pasillos {
  display: grid;
  place-items: center;
}

section.header {
  margin: 1.3rem 0rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  text-align: center;

  a {
    font-weight: 700;
  }
}

article {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  text-align: center;
  margin-bottom: 15px;
}

a.buttons {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
}

a.buttons.header {
  justify-content: flex-end;
}

fieldset {
  margin: 0;
}
</style>
