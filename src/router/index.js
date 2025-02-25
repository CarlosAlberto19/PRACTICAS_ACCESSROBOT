import { createRouter, createWebHistory } from 'vue-router';

// ✅ Importamos las vistas con los nombres correctos
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import CrearNuevaCuentaView from '@/views/CrearNuevaCuentaView.vue';
import DatosPersonalesView from '@/views/DatosPersonalesView.vue';
import RecuperarClaveView from '@/views/RecuperarClaveView.vue';
import HemosTerminadoView from '@/views/HemosTerminadoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/crear-cuenta', name: 'crear-cuenta', component: CrearNuevaCuentaView },
    { path: '/datos-personales', name: 'datos-personales', component: DatosPersonalesView },
    { path: '/recuperar-clave', name: 'recuperar-clave', component: RecuperarClaveView },
    { path: '/hemos-terminado', name: 'hemos-terminado', component: HemosTerminadoView }
  ],
});

export default router;
