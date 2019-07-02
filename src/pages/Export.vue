<template lang="html">
  <Layout>
    <div class="o-container o-section">
      <h1 class="h2 u-font-bold u-m-bot">Export</h1>
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
    </div>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Default';
import fileSafeString from '@/mixins/fileSafeString';
import themeVarOverrideHex from '@/mixins/themeVarOverrideHex';

export default {
  components: {
    Layout,
  },
  mixins: [
    fileSafeString,
    themeVarOverrideHex,
  ],
  methods: {
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
    exportAsJson() {
      // TODO: Implement version control
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
      const obj = {
        projectColors: true,
        // TODO: Pull this value from somewhere
        version: '0.1.0',
        name: this.$store.state.colors.name,
        hues,
        ...this.$store.state.themes,
      };
      this.createFileForDownload(
        'text/json',
        `${this.getFileSafeString(this.$store.state.colors.fileName)}.json`,
        JSON.stringify(obj),
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
  },
};
</script>
