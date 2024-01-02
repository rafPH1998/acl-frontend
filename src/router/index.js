import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/auth/LoginView.vue'
import ListView from '../views/users/ListView.vue'
import EditView from '../views/users/EditView.vue'

const routes = [
    {
      path: '/',
      name: 'home', 
      component: IndexView
    },
    {
        path: '/dashboard',
        name: 'dashboard', 
        component: DashboardView
    },
    {
        path: '/login',
        name: 'login', 
        component: LoginView
    },
    {
        path: '/usuarios',
        name: 'usuarios', 
        component: ListView
    },
    {
        path: '/usuario/:id',
        name: 'edit', 
        component: EditView,
        props: true
    },
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
