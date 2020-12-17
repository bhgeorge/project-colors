import generateUUID from '@/utils/methods/generate-uuid';
import {
  EDIT_HUE,
  DELETE_HUE,
  ADD_SHADE,
  EDIT_SHADE,
} from './mutation-types';
import {
  Hue,
  Shade,
  ShadeToAdd,
  PaletteState,
} from './types';

export default {
  [EDIT_HUE](state: PaletteState, hue: Hue) {
    state.hues[hue.id] = hue;
  },

  [DELETE_HUE](state: PaletteState, hue: Hue) {
    delete state.hues[hue.id];
  },

  [ADD_SHADE](state: PaletteState, shadeToAdd: ShadeToAdd) {
    state.shades[shadeToAdd.shade.id] = shadeToAdd.shade;
    // If the hue already exists, push the shade id
    if (shadeToAdd.hueId && state.hues[shadeToAdd.hueId]) {
      state.hues[shadeToAdd.hueId].shades.push(shadeToAdd.shade.id);
    } else {
      // Create a new hue for this shade
      const hue: Hue = {
        name: 'Hue',
        shades: [shadeToAdd.shade.id],
        id: generateUUID(),
      };
      state.hues[hue.id] = hue;
      state.order.push(hue.id);
    }
  },

  [EDIT_SHADE](state: PaletteState, shade: Shade) {
    state.shades[shade.id] = shade;
  },
};
