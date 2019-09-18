import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/theme',
      name: 'theme',
      component: () => import('@/pages/Themes'),
    },
    {
      path: '/save-load',
      name: 'saveLoad',
      component: () => import('@/pages/SaveLoad'),
    },
  ],
});
