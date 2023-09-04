<!-- eslint-disable no-alert -->
<script setup>
import { onBeforeMount, ref } from 'vue';
import { getAisles, deleteAisleFromApi } from '@/services/aisles';
import ButtonComponent from '@/components/ButtonComponent.vue';
import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

const userStore = useUserStore();
const modalStore = useModalStore();

const loading = ref(false);
const error = ref('');
const aisles = ref([]);
const openEditForm = (text, type, id) => {
  modalStore.openModal(text, type, true);
  modalStore.id = id;
};

const openForm = (text, type) => {
  modalStore.openModal(text, type);
};
const closeModal = () => {
  modalStore.closeModal();
};

const deleteAisle = async (aisleId) => {
  const checkConfirm = window.confirm('¿Estas seguro de borrar este pasillo?');
  if (!checkConfirm) {
    return;
  }

  const data = {
    pasillo_id: aisleId,
    token: userStore.token,
  };
  loading.value = true;
  const response = await deleteAisleFromApi(data);
  if (!response) {
    error.value = 'Error al borrar el pasillo';
    loading.value = false;
    return;
  }
  loading.value = false;
  aisles.value = aisles.value.filter((aisle) => aisle.pasillo_id !== aisleId);
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
        <ButtonComponent
          @click="openForm('Nuevo pasillo', 'aisleForm')"
          :confirm="true"
          title="Crear"
        />
        <ButtonComponent @click="closeModal" title="Cerrar" />
      </a>
      <section class="error" v-if="error">{{ error }}</section>
      <section class="header">
        <a>Pasillo</a>
        <a>Descripccion</a>
        <a>Opciones</a>
      </section>

      <article v-for="aisle in aisles" :key="aisle.pasillo_id">
        <a>{{ aisle.nombre }}</a>
        <a>{{ aisle.descripccion ? aisle.descripccion : '-' }}</a>
        <a class="buttons">
          <ButtonComponent
            title="Editar"
            @click="openEditForm('Editar pasillo', 'aisleForm', aisle.pasillo_id)"
            :confirm="true"
          />
          <ButtonComponent title="Borrar"  @click="deleteAisle(aisle.pasillo_id)" :delete="true" />
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
  gap: 1rem;
}

a.buttons.header {
  justify-content: flex-end;
}
</style>
