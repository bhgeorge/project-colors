export default {
  computed: {
    /**
     * Returns a filtered array of mapping IDs that use this variable
     *
     * @returns {Array} A list of mapping reference IDs
     */
    themeMappings() {
      const map = this.$store.state.themes.map; // eslint-disable-line
      const keys = Object.keys(map);
      const arr = [];
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (map[key].a === this.reference || map[key].b === this.reference) {
          arr.push(key);
        }
      }
      return arr;
    },
  },
};
