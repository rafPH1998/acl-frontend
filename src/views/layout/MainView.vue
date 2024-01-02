<template>
    <NavBar />
    <div class="lg:ml-64 lg:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-2">
        <div class="lg:flex gap-4 items-stretch">
            <slot/>
        </div>
    </div>
</template>

<script setup>
import NavBar from './NavBar.vue';
</script>