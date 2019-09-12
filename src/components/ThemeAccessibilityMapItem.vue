<template lang="html">
  <div class="c-theme-mapping">
    <!-- Variable -->
    <div class="c-input c-theme-mapping__item">
      <label
        :for="`${base}-${reference}_map`"
      >
        Map to
      </label>
      <select
        :id="`${base}-${reference}_map`"
        class="c-input__input--select"
        name="map"
        v-model="selectedVar"
      >
        <option
          v-for="option in themeVars"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <!-- Level -->
    <div class="c-theme-mapping__item">
      <div class="c-input u-d-inline-block">
        <label
          :for="`${base}-${reference}_level`"
        >
          Minimum Contrast
        </label>
        <select
          :id="`${base}-${reference}_level`"
          class="c-input__input--select"
          name="level"
          v-model="selectedLevel"
        >
          <option value="ui">UI (3.0)</option>
          <option value="aa">AA (4.5)</option>
          <option value="aaa">AAA (7.0)</option>
        </select>
      </div>
      <!-- Pass/Fail -->
      <div v-if="contrastFail" class="u-d-inline-block u-m-left-xs">
        <Icon type="warning" />
      </div>
    </div>
    <!-- Delete -->
    <button
      class="c-btn--ui c-theme-mapping__item"
      type="button"
      name="removeMapping"
      @click="removeMapping"
    >
      <Icon type="close" :modifiers="['o-icon--l']" />
      <span class="u-visually-hidden">Remove mapping</span>
    </button>
  </div>
</template>

<script>
import Icon from 'vue-base/components/Icon';
import colorContrast from '@/mixins/colorContrast';

export default {
  props: {
    reference: {
      type: String,
      required: true,
    },
    base: {
      type: String,
      required: true,
    },
  },
  components: {
    Icon,
  },
  mixins: [
    colorContrast,
  ],
  computed: {
    mapping() {
      return this.$store.state.themes.map[this.reference];
    },
    themeVars() {
      return this.$store.state.themes.themeVars;
    },
    selectedVar: {
      get() {
        if (this.mapping.a === this.base) {
          return this.mapping.b;
        }
        if (this.mapping.b === this.base) {
          return this.mapping.a;
        }
        return '';
      },
      set(value) {
        this.$store.dispatch('themes/updateMapping', {
          ...this.mapping,
          a: this.base,
          b: value,
        });
      },
    },
    selectedLevel: {
      get() {
        return this.mapping.level;
      },
      set(value) {
        this.$store.dispatch('themes/updateMapping', {
          ...this.mapping,
          level: value,
        });
      },
    },
    contrastFail() {
      if (this.selectedVar) {
        const shadeA = this.$store.state.themes.themeVars[this.mapping.a].val;
        const shadeB = this.$store.state.themes.themeVars[this.mapping.b].val;
        return !this.isHigherThanThreshold(
          this.$store.state.colors.shades[shadeA].hex,
          this.$store.state.colors.shades[shadeB].hex,
          this.selectedLevel,
        );
      }
      return false;
    },
  },
  methods: {
    removeMapping() {
      this.$store.dispatch('themes/removeMapping', this.reference);
    },
  },
};
</script>
