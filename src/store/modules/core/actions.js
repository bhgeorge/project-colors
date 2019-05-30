import * as types from './mutation-types';

export const closeAlert = ({ commit }, index) => {
  commit(types.CLOSE_ALERT, index);
};

export const setAlert = ({ commit }, obj) => {
  obj.classes = ['c-alert', 'c-alert--global', `c-alert--${obj.type}`];
  // TODO: Make this a UUID
  obj.id = Math.floor(Math.random() * 99999);
  commit(types.SET_ALERT, obj);
};

export default {
  closeAlert,
  setAlert,
};
