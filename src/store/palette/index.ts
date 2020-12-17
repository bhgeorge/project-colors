import mutations from './mutations';
import { PaletteState } from './types';

const state: PaletteState = {
  filename: 'new-palette',
  hues: {},
  id: '',
  name: 'New Palette',
  order: [],
  shades: {},
};

export default {
  namespaced: true,
  state,
  mutations,
};
