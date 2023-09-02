<script setup>
import { onMounted, ref } from 'vue';
import userReferenceStore from '../stores/reference';
import { getReferencesFromApi } from '../controller/references';
import LoadingComponent from './LoadingComponent.vue';

const referencesStored = userReferenceStore();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const response = await getReferencesFromApi();
  console.log(response);
  referencesStored.referenceList = response;
  loading.value = false;
});

</script>
<template>
    <LoadingComponent v-if="loading" text="Cargando referencias" />
    <section class="last-reference" v-else>
        <h2>Últimas referencias</h2>
        <ul>
            <li v-for=" reference in referencesStored.referenceList" :key="reference.id">
                <font-awesome-icon :icon="['fas', 'barcode']" />
                <span>{{ reference.referencia }}</span>
            </li>
        </ul>
    </section>
</template>
<style scoped>
ul{
    display: flex;
    gap: 22px;
}
li{
    display: flex;
    align-items: center;
    gap: 10px;

    text-decoration: underline;
}
</style>
