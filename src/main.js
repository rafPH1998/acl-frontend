import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import store from './store'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const vuexStore = createStore(store)

createApp(App)
    .use(router)
    .use(Vue3Toastify)
    .use(vuexStore)
    .mount('#app')


