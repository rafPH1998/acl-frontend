<template>
    <div class="w-screen h-screen flex justify-center items-center bg-gray-100 text-black font-light">
        <form 
            @submit.prevent="auth()" method="POST"
            class="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 stroke-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <p class="mb-5 text-3xl uppercase text-gray-600">Login</p>
            <input 
                type="email" 
                name="email" 
                v-model="form.email"
                class="mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" 
                placeholder="Email" 
            >
            <input 
                type="password" 
                name="password" 
                v-model="form.password"
                class="mb-5 p-3 w-80 focus:border-blue-700 rounded border-2 outline-none" 
                placeholder="Senha" 
                >
            <button 
                :disabled="processing"
                class="bg-blue-600 hover:bg-blue-900 text-white font-bold p-2 rounded w-80" id="login" type="submit">
                <span v-if="processing">Logando...</span>
                <span v-else>Logar</span>
            </button>
       <!--      <button class="bg-gray-600 mt-2 hover:bg-gray-900 text-white font-bold p-2 rounded w-80" id="login" type="submit"><span>Registrar-se</span></button> -->
        </form>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const form = ref({
    email: '',
    password: ''
})

const processing = ref(false)

const auth = async () => {
    processing.value = true

    try {
        const response = await axios.post('http://localhost:8899/auth', {
            email: form.value.email,
            password: form.value.password,
            device_name: 'user',
        })

        if (response.status === 200) {
            store.dispatch('setToken', response.data.token)
            router.push({ name: 'dashboard' })
            await getUserAuth() 
        }

    } catch (error) {
        console.error(error)
    } finally {
        processing.value = false
    }
}

const getUserAuth = async () => {
    try {
        const response = await axios.get('http://localhost:8899/me', {
            headers: {
                Authorization: `Bearer ${store.state.token}`
            }
        });
        store.dispatch('setUser', response.data.data.name)
    } catch (error) {
        console.error(error)
    }
}
</script>
