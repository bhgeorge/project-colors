import Vue from 'vue';
import PortalVue from 'portal-vue';
import App from './App';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './assets/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(PortalVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
