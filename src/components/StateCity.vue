<template>
    <div class="flex">
        <select 
            v-model="localState" 
            class="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
            <option value="" disabled selected hidden>SELECIONE UM ESTADO</option>
            <option
                v-for="state in stateCity"
                :key="state.sigla"
                :value="state.nome"
            >{{ state.nome }}</option>
        </select>

        <div v-show="localState">
            <select 
                v-model="localCity" 
                class="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                <option value="" disabled selected hidden>SELECIONE UMA CIDADE</option>
                <option
                    v-for="city in citiesList"
                    :key="city"
                    :value="city"
                    >{{ city }}
                </option>
            </select>
        </div>

    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import stateCity from '../../state-city.json'

const emit = defineEmits(['update:state', 'update:city'])
const props = defineProps({
    state: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    }
})

const citiesList = computed(() => stateCity.find(obj => obj.nome === localState.value)?.cidades)

const localState = computed({
    get() {
        return props.state
    },
    set(value) {
        emit('update:state', value)
    }
})

const localCity = computed({
    get() {
        return props.city
    },
    set(value) {
        emit('update:city', value)
    }
})
</script>