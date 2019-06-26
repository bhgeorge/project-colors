/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
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

export default {
  addThemeVar,
  updateThemeVar,
  addMapping,
  updateMapping,
};
