import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Palette from '../views/Palette.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Palette',
    component: Palette,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
