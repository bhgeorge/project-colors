/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import store from '@/store';
import * as types from './mutation-types';

export const addHue = ({ commit }, obj) => {
  commit(types.ADD_HUE, obj);
};

export const removeHue = ({ commit }, int) => {
  commit(types.REMOVE_HUE, int);
};

export const updateHue = ({ commit }, obj) => {
  commit(types.UPDATE_HUE, obj);
};

export const addShade = ({ commit }, obj) => {
  commit(types.ADD_SHADE, obj);
};

export const removeShade = ({ commit }, obj) => {
  commit(types.REMOVE_SHADE, obj);
};

export const updateShade = ({ commit }, obj) => {
  commit(types.UPDATE_SHADE, obj);
};

export const setName = ({ commit }, str) => {
  commit(types.SET_KEY, { key: 'name', val: str });
  let file = str.trim()
    .replace(/ /g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/([^a-zA-Z0-9-_/./:]+)/g, '');
  if (file.length === 0) {
    file = 'project-colors';
  }
  commit(types.SET_KEY, { key: 'fileName', val: file });
};

export const setId = ({ commit }, str) => {
  commit(types.SET_KEY, { key: 'id', val: str });
};

export const importColors = ({ commit }, obj) => { // eslint-disable-line
  commit(types.RESET_STATE);
  store.dispatch('colors/setName', obj.name);
  store.dispatch('colors/setId', obj.id);

  // TODO: Swap this out for a transform && plop
  for (let i = 0; i < obj.hues.length; i += 1) {
    const hue = obj.hues[i];
    store.dispatch('colors/addHue', { ...hue, shades: [] });
    for (let j = 0; j < hue.shades.length; j += 1) {
      store.dispatch('colors/addShade', { id: hue.id, shade: hue.shades[j] });
    }
  }
  if (!obj.suppressAlert) {
    store.dispatch('core/setAlert', { title: 'Palette loaded', type: 'success' });
  }
};

export default {
  addHue,
  removeHue,
  updateHue,
  addShade,
  removeShade,
  updateShade,
  importColors,
  setName,
  setId,
};
