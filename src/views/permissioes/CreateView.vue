<template>
  <MainView>
    <div class="bg-white rounded-lg shadow-lg w-full text-gray-700">
      <form method="POST" class="mt-4">
        <div class="grid gap-4 grid-cols-2 px-6">

          <div>
            <p>Nome:</p>
            <input type="text" name="name"
              v-model="form.name"
              :class="{'border border-rose-500': errors.name, 'border-2': !errors.name}"
              class="mr-2 mb-5 p-1 w-full focus:border-blue-700 rounded outline-none" placeholder="Nome da permissão" required>
            <p class="text-red-600 text-xs" 
            v-for="error in errors.name" 
            :key="error.id">
            {{ error }}</p>
          </div>

          <div>
            <p>Descrição:</p>
            <input type="description" name="description"
              v-model="form.description"
              :class="{'border border-rose-500': errors.description, 'border-2': !errors.description}"
              class="mr-2 mb-5 p-1 w-full focus:border-blue-700 rounded outline-none"
              placeholder="Descrição da permissão" required>
              <p class="text-red-600 text-xs" 
                v-for="error in errors.description" 
                :key="error.id">
              {{ error }}</p>
          </div>

        </div>
      </form>

      <div class="mt-16 flex justify-between px-6 py-2">
          <router-link :to="{ name: 'edit', params: { id: props.id } }" class="items-center border rounded px-6 hover:bg-red-500
                        py-1 bg-red-400 text-white text-xs flex font-bold">
            <BackView />
            Voltar
          </router-link>

          <button
            @click.prevent="addPermission()"
            :to="{ name: 'permissoes', params: { id: props.id } }" 
            class="items-center border 
            rounded w-48 flex justify-center 
            py-1 bg-blue-500 text-white text-xs 
            flex font-bold hover:bg-blue-600">
            <AddView />
            <span v-if="loading">Criando...</span>
            <span v-else>Criar nova permissão</span>
          </button>

      </div>
    </div>
    
  </MainView>
</template>
 
<script setup>
import MainView from '../layout/MainView.vue';
import BackView from '@/icons/BackView.vue'
import AddView from '@/icons/AddView.vue'
import { defineProps } from 'vue';
import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { toast } from 'vue3-toastify';

const props = defineProps({
  id: {
    type: String,
    require: true
  }
})

const store = useStore()

const form = ref({
    name: '',
    description: ''
})

const errors = ref('')
const loading = ref(false)

const addPermission = async () => {
    loading.value = true

    try {
        const response = await axios.post('http://localhost:8899/permissions', {
          name: form.value.name,
          description: form.value.description,
        }, {
          headers: {
            Authorization: `Bearer ${store.state.token}`
          }
        });

        if (response.status === 201) {
          form.value.name = ''
          form.value.description = ''
          errors.value = '';

          toast.success("Nova Permissão criada!", {
            autoClose: 2000,
            position: 'bottom-right'
          });
        }

    } catch (error) {
      errors.value = error.response.data.errors
    } finally {
      loading.value = false
    }
}

</script>
 
