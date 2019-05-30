import {
  CLOSE_ALERT,
  SET_ALERT,
} from './mutation-types';

export default {
  [CLOSE_ALERT](state, index) {
    state.alerts.splice(index, 1);
  },

  [SET_ALERT](state, obj) {
    state.alerts.push(obj);
  },
};
