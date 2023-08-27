<script setup>
import ReferenceDetails from './components/referenceDetails.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import PasillosComponent from './components/PasillosComponent.vue';
import SectionComponent from './components/SectionComponent.vue';
import AlturaComponent from './components/AlturaComponent.vue';
import ModalComponent from './components/ModalComponent.vue';

</script>

<template>
  <ModalComponent />
  <HeaderComponent />
  <section class="aside">
    <PasillosComponent />
    <SectionComponent />
    <AlturaComponent />
  </section>
  <ReferenceDetails />
</template>

<style scoped>
section.aside{
  display: flex;
  justify-content: space-around;
  gap: 3rem;
  padding: 2rem;
}

section.aside section{
  min-width: 12rem;
}
</style>
