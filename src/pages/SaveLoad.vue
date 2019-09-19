<template lang="html">
  <Layout>
    <div class="o-section">
      <div class="o-container">
        <h1 class="h1 u-font-serif u-font-bold">Save/Load</h1>
      </div>
    </div>
    <section v-if="$store.state.core.db" class="o-section">
      <div class="o-container">
        <h2 class="h3 u-font-bold">Your Palettes</h2>
        <ul v-if="indexedPalettes.length > 0" class="o-list-bare">
          <li
            v-for="palette in indexedPalettes"
            :key="palette.id"
            class="o-list-bare__item"
          >
            <button
              class="c-btn--text"
              type="button"
              :name="`load_${palette.name}`"
              @click="loadPaletteFromIDB(palette.id)"
            >
              {{ palette.name }}
            </button>
          </li>
        </ul>
        <p v-else>It looks like you don't have any saved palettes</p>
        <button
          v-if="notEmpty"
          class="c-btn c-btn--primary u-m-top"
          type="button"
          name="button"
          @click="savePaletteToIDB"
        >
          Save Palette Locally
        </button>
      </div>
    </section>
    <section class="o-section">
      <div class="o-container">
        <h2 class="h3 u-font-bold">Upload</h2>
        <label for="importFile">Select a File to Upload</label>
        <div class="u-m-top-s">
          <input
            id="importFile"
            class="c-btn c-btn--primary"
            type="file"
            name="importFile"
            @change="importFile"
            ref="importFile"
          />
        </div>
      </div>
    </section>
    <section v-if="notEmpty" class="o-container o-section">
      <h2 class="h3 u-font-bold u-m-bot">Download</h2>
      <ul class="o-list-inline">
        <li class="o-list-inline__item">
          <button
            class="c-btn c-btn--primary"
            @click="exportAsJson"
          >
            <span class="u-visually-hidden">Download as</span>JSON
          </button>
        </li>
        <li class="o-list-inline__item">
          <button
            class="c-btn c-btn--primary"
            @click="exportAsScss"
          >
            <span class="u-visually-hidden">Download as</span>SCSS
          </button>
        </li>
      </ul>
    </section>
  </Layout>
</template>

<script>
import { format } from 'date-fns';
import Layout from '@/layouts/Default';
import fileSafeString from '@/mixins/fileSafeString';
import themeVarOverrideHex from '@/mixins/themeVarOverrideHex';
import randomId from '@/mixins/randomId';
import idbUtils from '@/mixins/idbUtils';
import { PALETTE_STORE_NAME } from '@/mixins/strConstants';

export default {
  components: {
    Layout,
  },
  mixins: [
    fileSafeString,
    themeVarOverrideHex,
    randomId,
    idbUtils,
  ],
  data() {
    return {
      indexedPalettes: [],
    };
  },
  computed: {
    notEmpty() {
      return this.$store.state.colors.order.length > 0;
    },
  },
  methods: {
    importFile() {
      const file = this.$refs.importFile.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = (e) => {
          this.setPalette(JSON.parse(e.target.result));
        };
        reader.onerror = (e) => {
          console.log(e); // eslint-disable-line no-console
        };
      }
    },
    createFileForDownload(textType, fileName, file) {
      const el = document.createElement('a');
      el.setAttribute('href', `data:${textType};charset=utf-8,${encodeURIComponent(file)}`);
      // TODO: Swap this for palette name
      el.setAttribute('download', `${fileName}`);
      el.style.display = 'none';
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    },
    // TODO: Move this to a global method that we call frequently to auto-save.
    buildDataObject() {
      const hues = [];
      for (let i = 0; i < this.$store.state.colors.order.length; i += 1) {
        const hueId = this.$store.state.colors.order[i];
        const hue = this.$store.state.colors.hues[hueId];
        const arr = [];
        for (let j = 0; j < hue.shades.length; j += 1) {
          const shadeId = hue.shades[j];
          arr.push(this.$store.state.colors.shades[shadeId]);
        }
        hues.push({ ...hue, shades: arr });
      }

      return {
        projectColors: true,
        // TODO: Pull this value from the package
        version: '1.0.0',
        name: this.$store.state.colors.name,
        id: this.$store.state.colors.id,
        hues,
        ...this.$store.state.themes,
        lastUpdated: format(new Date(), 'yyyyMMddHHmmss'), // Format this weird so we can test with parseInt()
      };
    },
    exportAsJson() {
      this.createFileForDownload(
        'text/json',
        `${this.getFileSafeString(this.$store.state.colors.fileName)}.json`,
        JSON.stringify(this.buildDataObject),
      );
    },
    exportAsScss() {
      const shades = { ...this.$store.state.colors.shades };
      const shadeThemeMap = {};

      // _settings.theme.scss
      let settingsTheme = '';
      const themeVarKeys = Object.keys(this.$store.state.themes.themeVars);
      for (let i = 0; i < themeVarKeys.length; i += 1) {
        const themeVar = this.$store.state.themes.themeVars[themeVarKeys[i]];
        const shade = shades[themeVar.val].hex;
        settingsTheme += `$${themeVar.name}: ${shade};\n`;
        shadeThemeMap[shade] = `$${themeVar.name}`;
      }
      this.createFileForDownload(
        'text/plain',
        '_settings.theme.scss',
        settingsTheme,
      );

      // _settings.theme.[[override]].scss
      const themeKeys = Object.keys(this.$store.state.themes.themes);
      for (let i = 0; i < themeKeys.length; i += 1) {
        let settingsThemeOverride = '';
        const theme = this.$store.state.themes.themes[themeKeys[i]];
        for (let j = 0; j < themeVarKeys.length; j += 1) {
          const key = themeVarKeys[j];
          const themeVar = this.$store.state.themes.themeVars[key];
          const override = theme.vals[key] || null;
          const hex = this.getThemeVarOverrideHex(key, override);
          settingsThemeOverride += `$${themeVar.name}: ${hex};\n`;
        }
        this.createFileForDownload(
          'text/plain',
          `_settings.theme.${this.getFileSafeString(theme.name)}.scss`,
          settingsThemeOverride,
        );
      }

      // _settings.colors.scss
      let settingsColors = '$colors: (';
      for (let i = 0; i < this.$store.state.colors.order.length; i += 1) {
        const hueId = this.$store.state.colors.order[i];
        const hue = this.$store.state.colors.hues[hueId];
        if (hue.shades.length === 1) {
          settingsColors += `\n  '${hue.name.toLowerCase()}': ${shades[hue.shades[0]].hex},`;
        } else {
          settingsColors += `\n  '${hue.name.toLowerCase()}': (`;
          for (let j = 0; j < hue.shades.length; j += 1) {
            const shade = shades[hue.shades[j]];
            const val = shadeThemeMap[shade.hex] || shade.hex;
            settingsColors += `\n    '${shade.name.toLowerCase()}': ${val}`;
          }
          settingsColors += '\n  ),';
        }
      }
      for (let i = 0; i < themeVarKeys.length; i += 1) {
        const themeVar = this.$store.state.themes.themeVars[themeVarKeys[i]];
        settingsColors += `\n '${themeVar.name}': $${themeVar.name}`;
      }
      settingsColors += '\n);';
      this.createFileForDownload(
        'text/plain',
        '_settings.colors.scss',
        settingsColors,
      );
    },
    getAllPalettesFromIDB() {
      const palettes = this.getAllFromIDB(PALETTE_STORE_NAME);
      const handleResults = (res) => {
        this.indexedPalettes = res.map(r => ({ name: r.name, id: r.id }));
      };
      if (palettes) {
        palettes.then(handleResults);
      }
    },
    loadPaletteFromIDB(id) {
      const palette = this.getFromIDB(PALETTE_STORE_NAME, id);
      const handleResults = (res) => {
        this.setPalette(res);
      };
      if (palette) {
        palette.then(handleResults);
      }
    },
    savePaletteToIDB() {
      this.putInIDB(PALETTE_STORE_NAME, this.buildDataObject());
    },
  },
  mounted() {
    this.getAllPalettesFromIDB();
  },
};
</script>
