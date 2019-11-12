/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import * as types from './mutation-types';

export const swapActive = ({ commit }) => {
  commit(types.SWAP_ACTIVE);
};

export const setHex = ({ commit }, str) => {
  commit(types.SET_HEX, str);
};

export default {
  swapActive,
  setHex,
};
