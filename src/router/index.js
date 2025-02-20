import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import LoginView2 from '@/views/LoginView2.vue';
import DatosPersonalesView from '@/views/DatosPersonalesView.vue';
import LoginViewCrearNuevaCuenta from '@/views/LoginViewCrearNuevaCuenta.vue';
import RecuperarClaveView from '@/views/RecuperarClaveView.vue';  // ✅ Nueva vista
import HemosTerminadoView from '@/views/HemosTerminadoView.vue';  // ✅ Nueva vista añadida


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/login-web', name: 'login-web', component: LoginView2 },
    { path: '/datos-personales', name: 'datos-personales', component: DatosPersonalesView },
    { path: '/crear-cuenta', name: 'crear-cuenta', component: LoginViewCrearNuevaCuenta }, // ✅ Corregido
    { path: '/recuperar-clave', name: 'recuperar-clave', component: RecuperarClaveView } , // ✅ Nueva ruta
    { path: '/hemos-terminado', name: 'hemos-terminado', component: HemosTerminadoView }  // 👈 Asegúrate de que la ruta está definida
    
  ],
});

export default router;
