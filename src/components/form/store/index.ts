import mutations from './mutations';
import { VuexFormState } from './types';

const state: VuexFormState = {
  forms: {},
  fields: {},
};

export default {
  namespaced: true,
  state,
  mutations,
};
