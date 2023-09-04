<!-- eslint-disable no-alert -->
<script setup>
import { onBeforeMount, ref } from 'vue';
import { getSections } from '@/services/sections';
import { getAisles } from '@/services/aisles';
import { getRacksBySectionId, deleteRackFromApi } from '@/services/racks';
import ButtonComponent from '@/components/ButtonComponent.vue';
import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

const userStore = useUserStore();
const modalStore = useModalStore();

const loading = ref(false);
const error = ref('');
const sections = ref([]);
const aisles = ref([]);
const racks = ref([]);

const selectedData = ref({
  aisle: '',
  section: '',
});

const openEditForm = (text, type, id) => {
  modalStore.openModal(text, type, true);
  modalStore.id = id;
};

const getSection = async (aisleId) => {
  loading.value = true;
  const response = await getSections(aisleId);
  if (!response) {
    loading.value = false;
    error.value = 'Error al cargar las secciones';
    return;
  }
  sections.value = response;
  loading.value = false;
};

const getRacks = async () => {
  loading.value = true;
  const response = await getRacksBySectionId(selectedData.value.section);
  if (!response) {
    loading.value = false;
    error.value = 'Error al cargar los racks';
    return;
  }
  racks.value = response;
  loading.value = false;
};

const openForm = (text, type) => {
  modalStore.openModal(text, type);
};
const closeModal = () => {
  modalStore.closeModal();
};

const deleteRack = async (id) => {
  const checkConfirm = window.confirm('¿Estas seguro de borrar esta altura?');
  if (!checkConfirm) {
    return;
  }

  const data = {
    id,
    token: userStore.token,
  };
  loading.value = true;
  const response = await deleteRackFromApi(data);
  if (!response) {
    error.value = 'Error al borrar la altura';
    loading.value = false;
    return;
  }
  loading.value = false;
  racks.value = racks.value.filter((rack) => rack.id !== id);
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
          <select name="aisle" id="aisle" @change="getSection" v-model="selectedData.aisle">
            <option value="" disabled selected>Selecciona un pasillo</option>
            <option v-for="aisle in aisles" :key="aisle.pasillo_id" :value="aisle.pasillo_id">
              Pasillo - {{ aisle.nombre }}
            </option>
          </select>
        </fieldset>

        <fieldset v-if="sections.length > 0">
          <label for="aisle">Selecciona la sección</label>
          <select name="section" id="section" @change="getRacks" v-model="selectedData.section">
            <option value="" disabled selected>Selecciona una sección</option>
            <option v-for="section in sections" :key="section.id" :value="section.id">
              Sección - {{ section.nombre }}
            </option>
          </select>
        </fieldset>
        <ButtonComponent
          @click="openForm('Nueva altura', 'rackForm')"
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
      <article v-for="rack in racks" :key="rack.id">
        <a>{{ rack.nombre }}</a>
        <a>{{ rack.descripccion ? rack.descripccion : '-' }}</a>
        <a class="buttons">
          <ButtonComponent
            title="Editar"
            @click="openEditForm('Editar altura', 'rackForm', rack.id)"
            :confirm="true"
          />
          <ButtonComponent title="Borrar"  @click="deleteRack(rack.id)" :delete="true" />
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

fieldset{
    margin: 0;
}
</style>
