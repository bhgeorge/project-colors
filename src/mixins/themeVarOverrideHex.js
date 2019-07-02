export default {
  methods: {
    /**
     * Returns the themeOverride hex value
     *
     * @param {Object} baseThemeVarId The base themeVar to be used if no override is present.
     * @param {Object} themeOverride The override for the base themeVar in this specific theme.
     *
     * @returns {String} The hex value of the themeVariable in the selected theme.
     */
    getThemeVarOverrideHex(baseThemeVarId, themeOverride = null) {
      if (themeOverride) {
        if (themeOverride.hex) {
          return themeOverride.hex;
        }
        return this.$store.state.colors.shades[themeOverride.shade].hex;
      }
      const baseThemeVar = this.$store.state.themes.themeVars[baseThemeVarId];
      return this.$store.state.colors.shades[baseThemeVar.val].hex;
    },
  },
};
