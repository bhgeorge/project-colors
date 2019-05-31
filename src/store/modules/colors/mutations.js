/* eslint-disable no-param-reassign */
import {
  ADD_HUE,
  ADD_SHADE,
  UPDATE_SHADE,
  SET_BULK,
} from './mutation-types';

export default {
  [ADD_HUE](state, obj) {
    state.hues.push(obj);
  },

  [ADD_SHADE](state, obj) {
    state.hues[obj.index].shades.push(obj.shade);
  },

  [UPDATE_SHADE](state, obj) {
    state.hues[obj.hueIndex].shades[obj.shadeIndex] = obj.shade;
  },

  [SET_BULK](state, arr) {
    state.hues = arr;
  },
};
/* eslint-enable no-param-reassign */
