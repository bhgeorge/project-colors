/* eslint-disable no-param-reassign */
import {
  SWAP_ACTIVE,
  SET_HEX,
} from './mutation-types';

export default {
  [SWAP_ACTIVE](state) {
    state.active = state.active === 'a' ? 'b' : 'a';
  },

  [SET_HEX](state, str) {
    state.hexes[state.active] = str;
  },
};
