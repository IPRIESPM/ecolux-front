<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import { ref } from 'vue';
import useModalReference from '@/stores/references';
import useUserStore from '@/stores/user';
import useModalStore from '@/stores/modal';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { deleteReferenceRackFromApi, deleteReferenceFromApi } from '@/services/references';

const userStore = useUserStore();
const modalStore = useModalStore();
const referenceStore = useModalReference();
const error = ref('');

const openModal = () => {
  const text = 'Editar referencia';
  const type = 'reference';
  modalStore.openModal(text, type, true);
};

const deleteReferenceRack = async (id) => {
  error.value = '';
  const checkConfirm = window.confirm('¿Estas seguro de borrar esta referencia?');
  if (!checkConfirm) {
    return;
  }
  const data = {
    id,
    token: userStore.token,
  };
  referenceStore.loading = true;
  const response = await deleteReferenceRackFromApi(data);
  if (!response) {
    error.value = 'Ha ocurrido un error al borrar la referencia';
  } else {
    error.value = '';
    referenceStore.deleteReferenceRack(id);
  }
  referenceStore.loading = false;
};

const deleteReference = async (id) => {
  error.value = '';
  const checkConfirm = window.confirm('¿Estas seguro de borrar esta referencia?');
  if (!checkConfirm) {
    return;
  }
  const data = {
    id,
    token: userStore.token,
  };
  referenceStore.loading = true;
  const response = await deleteReferenceFromApi(data);
  if (!response) {
    error.value = 'Ha ocurrido un error al borrar la referencia';
  } else {
    error.value = '';
    referenceStore.deleteReference(id);
  }
  referenceStore.loading = false;
};
</script>
<template>
  <section class="search-results">
    <section class="spinner" v-if="referenceStore.loading"></section>
    <section class="error" v-if="error">{{ error }}</section>
    <section class="reference" v-if="referenceStore.referenceSelected">
      <p>
        Referencia {{ referenceStore.referenceSelected.referencia }}
        {{ referenceStore.referenceSelected.detalles }}
      </p>
      <ButtonComponent title="Editar" :confirm="true" @click="openModal()"
      v-if="userStore.admin"
      />
      <ButtonComponent
        title="Borrar"
        :delete="true"
        v-if="referenceStore.referencesSearch.length === 0"
        @click="deleteReference(referenceStore.referenceSelected.id)"
      />
    </section>
    <section
      class="wrapper"
      v-if="referenceStore.referencesSearch && referenceStore.referencesSearch.length > 0"
    >
      <section class="header">
        <a>Fecha <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a>Pasillo <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a>Sección <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a>Altura <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a v-if="userStore.admin">Opciones</a>
      </section>
      <section class="body">
        <article v-for="reference in referenceStore.referencesSearch" :key="reference.id">
          <a>
            {{
              reference.fecha_creacion
                ? `${new Date(reference.fecha_creacion).toLocaleDateString('es-ES')}`
                : '-'
            }}
          </a>

          <a>{{ reference.pasillo_nombre }}</a>
          <a>{{ reference.seccion_nombre }}</a>
          <a>{{ reference.altura_nombre }}</a>
          <a class="button" v-if="userStore.admin">
            <ButtonComponent
              title="Borrar"
              :delete="true"
              @click="deleteReferenceRack(reference.id_referencia_altura)"
            />
          </a>
        </article>
      </section>
    </section>
  </section>
</template>

<style scoped>
section.search-results {
  margin-top: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  section {
    margin-bottom: 2rem;
  }
  section.wrapper {
    text-align: center;
  }
}

section.header,
article {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

section.header a {
  font-weight: 700;
}

a.button {
  display: flex;
  gap: 1rem;
}
section.reference {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  & p {
    font-weight: 700;
  }
}

article{
  padding-bottom: 1rem;
}
</style>
