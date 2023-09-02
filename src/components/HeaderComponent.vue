<script setup>

</script>
<template>
    <header>
        <img src="/logo_cabecera_fijo.png" alt="Logo">
        <section class="user">
            <font-awesome-icon :icon="['fas', 'circle-user']" />
            Usuario
        </section>
    </header>
</template>
<style scoped>
header {

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3rem;

    background: #373737;
    color: var(--color-orange);

    border-bottom: 12px solid #F84800;

    section.user{
        font-size: 1.6rem;
        display: flex;
        gap: 1.3rem;
        justify-content: center;
        align-items: center;
    }
}

nav{
    display: flex;
    align-items: center;
    justify-content: space-around;

    padding: 1rem;

    background: var(  --background-muted-gray);
}

section.btn{
    display: flex;
    gap: 1rem;
}

</style>
