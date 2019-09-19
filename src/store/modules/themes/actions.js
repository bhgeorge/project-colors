/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import store from '@/store';
import * as types from './mutation-types';

export const addThemeVar = ({ commit }, obj) => {
  commit(types.ADD_THEME_VAR, obj);
};

export const removeThemeVar = ({ commit }, str) => {
  commit(types.REMOVE_THEME_VAR, str);
};

export const updateThemeVar = ({ commit }, obj) => {
  commit(types.UPDATE_THEME_VAR, obj);
};

export const addMapping = ({ commit }, obj) => {
  commit(types.ADD_MAPPING, obj);
};

export const removeMapping = ({ commit }, str) => {
  commit(types.REMOVE_MAPPING, str);
};

export const updateMapping = ({ commit }, obj) => {
  commit(types.UPDATE_MAPPING, obj);
};

export const addTheme = ({ commit }, obj) => {
  commit(types.ADD_THEME, obj);
};

export const removeTheme = ({ commit }, str) => {
  commit(types.REMOVE_THEME, str);
};

export const setThemeName = ({ commit }, obj) => {
  commit(types.SET_THEME_NAME, obj);
};

export const setThemeVal = ({ commit }, obj) => {
  commit(types.SET_THEME_VAL, obj);
};

export const importThemes = ({ commit }, obj) => { // eslint-disable-line
  commit(types.RESET_STATE);

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
  removeThemeVar,
  updateThemeVar,
  addMapping,
  removeMapping,
  updateMapping,
  addTheme,
  removeTheme,
  setThemeName,
  setThemeVal,
  importThemes,
};
