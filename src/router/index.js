import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/auth/LoginView.vue'
import ListView from '../views/users/ListView.vue'
import EditView from '../views/users/EditView.vue'
import CreateView from '../views/permissioes/CreateView.vue'
import store from '@/store'

const routes = [
    {
      path: '/',
      name: 'home', 
      component: IndexView,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard', 
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login', 
      component: LoginView
    },
    {
      path: '/usuarios',
      name: 'usuarios', 
      component: ListView,
      meta: { requiresAuth: true }
    },
    {
      path: '/usuario/:id',
      name: 'edit', 
      component: EditView,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/permissoes/criar/:id',
      name: 'permissoes', 
      props: true,
      component: CreateView,
      meta: { requiresAuth: true }
    },
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = store.state.token;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'login' });
    } else {
      try {
        next();
      } catch (error) {
        console.error('Error validating token:', error);
        next({ name: 'login' }); // Redirect to login in case of an error
      }
    }
  } else {
    // No authentication required for this route
    next();
  }
});

export default router
