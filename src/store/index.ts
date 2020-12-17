import { createStore } from 'vuex';
// TODO: Import from vue-base v3
import forms from '@/components/form/store/index';
import palette from './palette/index';

export default createStore({
  modules: {
    forms,
    palette,
  },
});
