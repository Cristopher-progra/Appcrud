import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';
import ClienteView from '../views/ClienteView.vue';

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/cliente',
    name: 'cliente',
    component: ClienteView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
