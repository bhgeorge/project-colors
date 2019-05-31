<template lang="html">
  <Layout>
    <div class="o-container o-section">
      <h1 class="h2 u-font-bold u-m-bot">Export</h1>
      <ul class="o-list-inline">
        <li class="o-list-inline__item">
          <button class="c-btn c-btn--primary" @click="exportAsJson"><span class="u-visually-hidden">Download as</span>JSON</button>
        </li>
        <li class="o-list-inline__item">
          <button class="c-btn c-btn--primary" @click="exportAsScss"><span class="u-visually-hidden">Download as</span>SCSS</button>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Default';

export default {
  components: {
    Layout,
  },
  methods: {
    createFileForDownload(textType, fileExtension, file) {
      const el = document.createElement('a');
      el.setAttribute('href', `data:${textType};charset=utf-8,${encodeURIComponent(file)}`);
      // TODO: Swap this for palette name
      el.setAttribute('download', `testPalette.${fileExtension}`);
      el.style.display = 'none';
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    },
    exportAsJson() {
      // TODO: Implement version control
      const obj = {
        projectColors: true,
        // TODO: Pull this value from somewhere
        version: '0.0.1',
        hues: this.$store.state.colors.hues.map((h) => {
          const hue = {
            name: h.name,
            shades: h.shades,
          };
          return hue;
        }),
      };
      this.createFileForDownload('text/json', 'json', JSON.stringify(obj));
    },
    exportAsScss() {
      let str = '$colors: (';
      for (let i = 0; i < this.$store.state.colors.hues.length; i += 1) {
        const hue = this.$store.state.colors.hues[i];
        if (hue.shades.length > 1) {
          str += `\n  '${hue.name.toLowerCase()}': (`;
          for (let j = 0; j < hue.shades.length; j += 1) {
            const shade = hue.shades[j];
            str += `\n    '${shade.name.toLowerCase()}': ${shade.hex},`;
          }
          str += '\n  ),';
        } else {
          str += `\n  '${hue.name.toLowerCase()}': ${hue.shades[0].hex},`;
        }
      }
      str += '\n);';
      this.createFileForDownload('text/plain', 'scss', str);
    },
  },
};
</script>
