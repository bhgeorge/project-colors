/* eslint-disable no-param-reassign */
import Vue from 'vue';
import {
  ADD_THEME_VAR,
  REMOVE_THEME_VAR,
  UPDATE_THEME_VAR,
  ADD_MAPPING,
  REMOVE_MAPPING,
  UPDATE_MAPPING,
  ADD_THEME,
  REMOVE_THEME,
  SET_THEME_NAME,
  SET_THEME_VAL,
  RESET_STATE,
} from './mutation-types';

export default {
  [ADD_THEME_VAR](state, obj) {
    Vue.set(state.themeVars, obj.id, obj);
  },

  [REMOVE_THEME_VAR](state, str) {
    Vue.delete(state.themeVars, str);
  },

  [UPDATE_THEME_VAR](state, obj) {
    state.themeVars[obj.id] = obj;
  },

  [ADD_MAPPING](state, obj) {
    Vue.set(state.map, obj.id, obj);
  },

  [REMOVE_MAPPING](state, str) {
    Vue.delete(state.map, str);
  },

  [UPDATE_MAPPING](state, obj) {
    state.map[obj.id] = obj;
  },

  [ADD_THEME](state, obj) {
    Vue.set(state.themes, obj.id, obj);
  },

  [REMOVE_THEME](state, str) {
    Vue.delete(state.themes, str);
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

  [RESET_STATE](state) {
    state.themes = {};
    state.themeVars = {};
    state.map = {};
  },
};
/* eslint-enable no-param-reassign */
