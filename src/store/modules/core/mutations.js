import {
  CLOSE_ALERT,
  SET_ALERT,
  SET_DB,
  SAVE_PALETTE,
} from './mutation-types';

export default {
  [CLOSE_ALERT](state, index) {
    state.alerts.splice(index, 1);
  },

  [SET_ALERT](state, obj) {
    state.alerts.push(obj);
  },

  [SET_DB](state, obj) {
    state.db = obj;
  },

  [SAVE_PALETTE](state, str) {
    if (state.palettes.indexOf(str) === -1) {
      state.palettes.push(str);
    }
  },
};
