import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import LoginView2 from '@/views/LoginView2.vue'; // ✅ Importamos la nueva vista

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/login-web', // ✅ Nueva ruta para la versión web
      name: 'login-web',
      component: LoginView2,
    }
  ],
});

export default router;
