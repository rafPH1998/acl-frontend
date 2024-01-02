<template>
    <div class="p-10">
        <div>
            ESTADO - {{  state }} <br>
            CIDADE - {{  city }} <br>
            <StateCity 
                v-model:state="state"
                v-model:city="city"
            />
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import StateCity from '@/components/StateCity.vue';

const state = ref();
const city = ref();
</script>
