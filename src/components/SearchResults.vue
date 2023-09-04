<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import useModalReference from '@/stores/references';
import useUserStore from '@/stores/user';
import ButtonComponent from '@/components/ButtonComponent.vue';

const userStore = useUserStore();
const referenceStore = useModalReference();
</script>
<template>
  <section class="search-results">
    <section class="spinner" v-if="referenceStore.loading"></section>
    <section class="wrapper" v-if="referenceStore.referencesSearch.length > 0">
      <section>
        He encontrado la referencia:
        {{ referenceStore.referencesSearch[0].referencia }}
      </section>
      <section class="header">
        <a>Fecha <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a>Pasillo <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a>Sección <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a>Altura <font-awesome-icon :icon="['fas', 'sort']" /></a>
        <a v-if="userStore.admin">Opciones</a>
      </section>
      <section class="body">
        <article v-for="reference in referenceStore.referencesSearch" :key="reference.id">
          <a>{{ reference.fecha_creacion ? reference.fecha_creacion : '-' }}</a>
          <a>{{ reference.pasillo_nombre }}</a>
          <a>{{ reference.seccion_nombre }}</a>
          <a>{{ reference.altura_nombre }}</a>
          <a class="button" v-if="userStore.admin">
            <ButtonComponent
              title="Editar"
              :confirm="true"
              @click="referenceStore.openModal(reference, 'reference')"
            />
            <ButtonComponent
              title="Borrar"
              :delete="true"
              @click="referenceStore.deleteReference(reference.id)"
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

a.button{
  display: flex;
  gap: 1rem;
}
</style>
