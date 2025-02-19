import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import LoginView2 from '@/views/LoginView2.vue';
import DatosPersonalesView from '@/views/DatosPersonalesView.vue';
import LoginViewCrearNuevaCuenta from '@/views/LoginViewCrearNuevaCuenta.vue';
import RecuperarClaveView from '@/views/RecuperarClaveView.vue';  // ✅ Nueva vista

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/login-web', name: 'login-web', component: LoginView2 },
    { path: '/datos-personales', name: 'datos-personales', component: DatosPersonalesView },
    { path: '/crear-cuenta', name: 'crear-cuenta', component: LoginViewCrearNuevaCuenta }, // ✅ Corregido
    { path: '/recuperar-clave', name: 'recuperar-clave', component: RecuperarClaveView }  // ✅ Nueva ruta
    
  ],
});

export default router;
