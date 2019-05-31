/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import store from '@/store';
import * as types from './mutation-types';

export const addHue = ({ commit }, obj) => {
  commit(types.ADD_HUE, obj);
};

export const addShade = ({ commit }, obj) => {
  commit(types.ADD_SHADE, obj);
};

export const updateShade = ({ commit }, obj) => {
  commit(types.UPDATE_SHADE, obj);
};

export const setBulk = ({ commit }, arr) => {
  commit(types.SET_BULK, arr);
  store.dispatch('core/setAlert', { title: 'Palette uploaded', type: 'success' });
};

export default {
  addHue,
  addShade,
  updateShade,
  setBulk,
};
