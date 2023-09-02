<script setup>
import ReferenceDetails from './components/referenceDetails.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import ModalComponent from './components/ModalComponent.vue';
import NavComponent from './components/NavComponent.vue';
import LastReferencesComponent from './components/LastReferencesComponent.vue';

</script>

<template>
  <ModalComponent />
  <HeaderComponent />
  <NavComponent />
  <main>
    <LastReferencesComponent />
  </main>
  <ReferenceDetails />
</template>
<style scoped>

main{
  padding: 1rem;

}
</style>
