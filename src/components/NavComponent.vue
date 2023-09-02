<script setup>
import PasillosComponent from './PasillosComponent.vue';
import SectionComponent from './SectionComponent.vue';
import RackComponent from './RackComponent.vue';
</script>
<template>
    <nav>
        <PasillosComponent />
        <SectionComponent />
        <RackComponent />
    </nav>

</template>
<style scoped>
nav{
    display: flex;
    align-items: center;
    justify-content: flex-end;

    padding: 1rem;
    gap: 1rem;

    background: var(  --background-muted-gray);
}

</style>
