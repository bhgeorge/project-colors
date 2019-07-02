/* eslint-disable no-param-reassign */
import Vue from 'vue';
import {
  ADD_THEME_VAR,
  UPDATE_THEME_VAR,
  ADD_MAPPING,
  UPDATE_MAPPING,
  ADD_THEME,
  SET_THEME_NAME,
  SET_THEME_VAL,
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

  [ADD_THEME](state, obj) {
    Vue.set(state.themes, obj.id, obj);
  },

  [SET_THEME_NAME](state, obj) {
    state.themes[obj.id].name = obj.name;
  },

  [SET_THEME_VAL](state, obj) {
    const data = obj.hex ? { hex: obj.hex } : { shade: obj.shade };
    if (state.themes[obj.themeId].vals[obj.varId]) {
      state.themes[obj.themeId].vals[obj.varId] = data;
    } else {
      Vue.set(state.themes[obj.themeId].vals, obj.varId, data);
    }
  },
};
/* eslint-enable no-param-reassign */