import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import store from './store'

const vuexStore = createStore(store)

createApp(App)
    .use(router)
    .use(vuexStore)
    .mount('#app')


