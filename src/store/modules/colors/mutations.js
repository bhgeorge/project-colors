/* eslint-disable no-param-reassign */
import Vue from 'vue';
import {
  ADD_HUE,
  UPDATE_HUE,
  ADD_SHADE,
  REMOVE_SHADE,
  UPDATE_SHADE,
  SET_KEY,
} from './mutation-types';

export default {
  [ADD_HUE](state, obj) {
    Vue.set(state.hues, obj.id, obj);
    state.order.push(obj.id);
  },

  [UPDATE_HUE](state, obj) {
    state.hues[obj.id] = obj;
  },

  [ADD_SHADE](state, obj) {
    Vue.set(state.shades, obj.shade.id, obj.shade);
    state.hues[obj.id].shades.push(obj.shade.id);
  },

  [REMOVE_SHADE](state, obj) {
    const hueShades = state.hues[obj.hueId].shades;
    const index = hueShades.indexOf(obj.shadeId);
    if (index !== -1) {
      hueShades.splice(index, 1);
    }
    delete state.shades[obj.shadeId];
  },

  [UPDATE_SHADE](state, obj) {
    state.shades[obj.id] = obj;
  },

  [SET_KEY](state, obj) {
    state[obj.key] = obj.val;
  },
};
/* eslint-enable no-param-reassign */
