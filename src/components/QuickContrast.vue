<template>
  <div class="c-quick-contrast">
    <div class="c-quick-contrast__swatch-container">
      <div class="u-d-flex u-f-align-center">
        <div
          class="c-quick-contrast__swatch"
          :class="{'active': activeSwatch === 'a'}"
          :style="{ background: hexes.a }"
        ></div>
        <div
          class="c-quick-contrast__swatch"
          :class="{'active': activeSwatch === 'b'}"
          :style="{ background: hexes.b }"
        ></div>
      </div>
      <button
        class="c-btn--ui u-m-left-xl"
        @click="swapActive"
      >
        <Icon type="swap" />
        <span class="u-visually-hidden">Swap active color</span>
      </button>
    </div>
    <div class="u-m-top-xs u-font-xs u-c-gray-dark">
      <p :class="output.color">{{ output.ratio }}</p>
      <p>{{ output.levels }}</p>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-base/components/Icon';
import colorContrast from '@/mixins/colorContrast';

export default {
  mixins: [
    colorContrast,
  ],
  components: {
    Icon,
  },
  computed: {
    hexes() {
      return this.$store.state.quickContrast.hexes;
    },
    activeSwatch() {
      return this.$store.state.quickContrast.active;
    },
    output() {
      if (!this.hexes.a || !this.hexes.b) {
        return null;
      }
      const ratio = this.testContrast(this.hexes.a, this.hexes.b);
      const arr = [];
      const keys = Object.keys(this.contrastThresholds);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (ratio <= this.contrastThresholds[key]) {
          break;
        }
        arr.push(key.toUpperCase());
      }
      return {
        ratio,
        levels: arr.length === 0 ? 'None' : arr.join(', '),
        color: arr.length === 0 ? 'u-c-theme-error' : 'u-c-theme-success',
      };
    },
  },
  methods: {
    swapActive() {
      this.$store.dispatch('quickContrast/swapActive');
    },
    handleKeydown(event) {
      if (!document.activeElement || document.activeElement.tagName !== 'input') {
        if (event.code === 'KeyX') {
          this.swapActive();
        }
      }
    },
  },
  created() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>
