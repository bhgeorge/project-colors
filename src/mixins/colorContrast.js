export default {
  data() {
    return {
      contrastThresholds: {
        ui: 3,
        aa: 4.5,
        aaa: 7,
      },
    };
  },
  methods: {
    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : null;
    },
    getStandardValue(val) {
      return (val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4);
    },
    relativeLuminance(obj) {
      if (obj) {
        const r = this.getStandardValue(obj.r / 255);
        const g = this.getStandardValue(obj.g / 255);
        const b = this.getStandardValue(obj.b / 255);
        return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
      }
      return null;
    },
    testContrast(color1, color2) {
      const lum1 = this.relativeLuminance(this.hexToRgb(color1));
      const lum2 = this.relativeLuminance(this.hexToRgb(color2));

      if (typeof lum1 === 'number' && typeof lum2 === 'number') {
        const light = Math.max(lum1, lum2);
        const dark = Math.min(lum1, lum2);

        const ratio = (light + 0.05) / (dark + 0.05);

        return Math.round(ratio * 100) / 100;
      }
      return 0;
    },
    isHigherThanThreshold(color1, color2, threshold) {
      return this.testContrast(color1, color2) >= this.contrastThresholds[threshold];
    },
  },
};
