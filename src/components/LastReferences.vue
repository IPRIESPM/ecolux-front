<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import { onBeforeMount, ref } from 'vue';
import { getReferencesFromApi } from '@/services/references';
import useReferencesStore from '@/stores/references';

const loading = ref(false);
const referencesStore = useReferencesStore();

const updateReferences = async () => {
  const response = await getReferencesFromApi();
  const slicedResponse = await response.slice(response.length - 5, response.length);
  referencesStore.referencesList = slicedResponse;
};

onBeforeMount(async () => {
  loading.value = true;
  await updateReferences();
  loading.value = false;
});
</script>

<template>
  <section class="last-references">
    <h2>Últimas referencias:</h2>
    <section class="spinner" v-if="loading"></section>
    <ul v-else>
      <li
        v-for="reference in referencesStore.referencesList"
        :key="reference.id"
      >
        <font-awesome-icon :icon="['fas', 'barcode']" /> <span>{{ reference.referencia }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  display: flex;
  gap: 1rem;
}

li {
  font-weight: 600;
}
</style>
