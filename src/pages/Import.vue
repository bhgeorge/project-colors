<template lang="html">
  <Layout>
    <div class="o-container">
      <h1 class="h2 u-font-bold">Import</h1>
      <label for="importFile">Select a File to Upload</label>
      <input id="importFile" type="file" name="importFile" @change="importFile" ref="importFile"/>
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
    importFile() {
      const file = this.$refs.importFile.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = (e) => {
          const obj = JSON.parse(e.target.result);
          // TODO: Implement alerts for incorrect file uploads
          if (obj.projectColors) {
            // TODO: Implement version control
            this.$store.dispatch('colors/importColors', obj);
            this.$store.dispatch('themes/importThemes', obj);
          }
        };
        reader.onerror = (e) => {
          console.log(e); // eslint-disable-line no-console
        };
      }
    },
  },
};
</script>
