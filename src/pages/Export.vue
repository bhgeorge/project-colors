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

export default {
  components: {
    Layout,
  },
  methods: {
    createFileForDownload(textType, fileExtension, file) {
      const el = document.createElement('a');
      el.setAttribute('href', `data:${textType};charset=utf-8,${encodeURIComponent(file)}`);
      // TODO: Swap this for palette name
      el.setAttribute('download', `${this.$store.state.colors.fileName}.${fileExtension}`);
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
