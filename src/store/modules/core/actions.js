import * as types from './mutation-types';

export const closeAlert = ({ commit }, index) => {
  commit(types.CLOSE_ALERT, index);
};

export const setAlert = ({ commit }, obj) => {
  commit(types.SET_ALERT, {
    ...obj,
    classes: ['c-alert', 'c-alert--global', `c-alert--${obj.type}`],
    // TODO: Update randomId to be a non-Vue mixin and use that
    id: Math.floor(Math.random() * 99999),
  });
};

export const setDB = ({ commit }, obj) => {
  commit(types.SET_DB, obj);
};

export const savePalette = ({ commit }, str) => {
  commit(types.SAVE_PALETTE, str);
};

export default {
  closeAlert,
  setAlert,
  setDB,
  savePalette,
};
