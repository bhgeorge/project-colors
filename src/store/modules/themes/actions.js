/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import store from '@/store';
import * as types from './mutation-types';

export const addThemeVar = ({ commit }, obj) => {
  commit(types.ADD_THEME_VAR, obj);
};

export const updateThemeVar = ({ commit }, obj) => {
  commit(types.UPDATE_THEME_VAR, obj);
};

export const addMapping = ({ commit }, obj) => {
  commit(types.ADD_MAPPING, obj);
};

export const updateMapping = ({ commit }, obj) => {
  commit(types.UPDATE_MAPPING, obj);
};

export const addTheme = ({ commit }, obj) => {
  commit(types.ADD_THEME, obj);
};

export const setThemeName = ({ commit }, obj) => {
  commit(types.SET_THEME_NAME, obj);
};

export const setThemeVal = ({ commit }, obj) => {
  commit(types.SET_THEME_VAL, obj);
};

export const importThemes = ({ commit }, obj) => { // eslint-disable-line
  const vKeys = Object.keys(obj.themeVars);
  for (let i = 0; i < vKeys.length; i += 1) {
    store.dispatch('themes/addThemeVar', obj.themeVars[vKeys[i]]);
  }

  const mKeys = Object.keys(obj.map);
  for (let i = 0; i < mKeys.length; i += 1) {
    store.dispatch('themes/addMapping', obj.map[mKeys[i]]);
  }
};

export default {
  addThemeVar,
  updateThemeVar,
  addMapping,
  updateMapping,
  addTheme,
  setThemeName,
  setThemeVal,
  importThemes,
};
