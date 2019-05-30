import {
  ADD_HUE,
  ADD_SHADE,
  SET_BULK,
  RESET,
  SET_UPDATE,
} from './mutation-types';

export default {
  [ADD_HUE](state, obj) {
    state.rollingId += 1;
    const hue = { ...obj, id: state.rollingId };
    state.hues.push(hue);
  },

  [ADD_SHADE](state, obj) {
    state.hues[obj.index].shades.push(obj.shade);
  },

  [SET_BULK](state, arr) {
    state.hues = arr;
  },

  [RESET](state) {
    state.update = false;
    state.hues = [];
  },

  [SET_UPDATE](state, bool) {
    state.update = bool;
  },
};
