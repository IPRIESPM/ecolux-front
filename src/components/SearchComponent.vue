<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import { ref } from 'vue';
import { searchReferenceFromApi } from '@/services/references';
import useReference from '@/stores/references';

const referenceStore = useReference();

const searching = ref('');

const searchReference = async () => {
  referenceStore.loading = true;
  const response = await searchReferenceFromApi(searching.value);

  referenceStore.referencesSearch = response.referenceRack;
  referenceStore.referenceSelected = response.reference;
  referenceStore.loading = false;
};

</script>
<template>
  <section class="search">
    <h3>Buscador de referencias</h3>
    <form @submit.prevent="searchReference">
      <input type="search" placeholder="Introduce una referencia" v-model="searching" />
    </form>
  </section>
</template>

<style scoped>
section.search {
  text-align: center;
}
</style>
