<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import NavComponent from '../components/NavComponent.vue';
import LastReferences from '../components/LastReferences.vue';
import SearchComponent from '../components/SearchComponent.vue';
import SearchResults from '../components/SearchResults.vue';

</script>

<template>
  <ModalComponent />
  <HeaderComponent />
  <NavComponent />
  <main>
    <LastReferences />
    <SearchComponent />
    <SearchResults />
  </main>
</template>

<style scoped>
  main {
    padding: 0 48px;
  }
</style>
