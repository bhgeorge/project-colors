/* eslint-disable no-param-reassign */
import Vue from 'vue';
import {
  ADD_THEME_VAR,
  UPDATE_THEME_VAR,
  ADD_MAPPING,
  UPDATE_MAPPING,
} from './mutation-types';

export default {
  [ADD_THEME_VAR](state, obj) {
    Vue.set(state.themeVars, obj.id, obj);
  },

  [UPDATE_THEME_VAR](state, obj) {
    state.themeVars[obj.id] = obj;
  },

  [ADD_MAPPING](state, obj) {
    Vue.set(state.map, obj.id, obj);
  },

  [UPDATE_MAPPING](state, obj) {
    state.map[obj.id] = obj;
  },
};
/* eslint-enable no-param-reassign */
