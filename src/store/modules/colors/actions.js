import * as types from './mutation-types';

export const addHue = ({ commit }, obj) => {
  commit(types.ADD_HUE, obj);
};

export const addShade = ({ commit }, obj) => {
  commit(types.ADD_SHADE, obj);
};

export const setBulk = ({ commit }, arr) => {
  commit(types.SET_BULK, arr);
};

export const reset = ({ commit }) => {
  commit(types.RESET);
};

export const setUpdate = ({ commit }, bool) => {
  commit(types.SET_UPDATE, bool);
};

export default {
  addHue,
  addShade,
  setBulk,
  reset,
  setUpdate,
};
