import { Dictionary } from '@/utils/interfaces/interface.dictionary';
import generateUUID from '@/utils/methods/generate-uuid';

export interface Shade {
  hex: string,
  id: string,
  name: string,
}

export interface ShadeToAdd {
  shade: Shade,
  hueId?: string,
}

export interface Hue {
  id: string,
  name: string,
  shades: Array<string>,
}

export interface PaletteState {
  filename: string;
  hues:  Dictionary<Hue>;
  id: string;
  name: string;
  order: Array<string>;
  shades: Dictionary<Shade>;
}
