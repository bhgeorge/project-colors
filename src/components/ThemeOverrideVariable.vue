<template lang="html">
  <div :class="classObj">
    <!-- Display -->
    <div class="o-cover-link">
      <a class="o-cover-link__item" href="#" role="button" @click.prevent="displayEdit = true">
        <SwatchReference
          :hex="hex"
          :name="baseVar.name"
        />
        <span class="u-visually-hidden">Edit theme variable</span>
      </a>
    </div>
    <!-- Contrast Errors -->
    <div v-if="contrastErrors.length > 0" class="u-bg-theme-base-white u-p-xs">
      <div class="u-d-flex">
        <Icon type="warning" :modifiers="['u-font-vert-mid', 'u-c-theme-error']" />
        <div class="u-m-left">
          <p>Contrast Issues</p>
          <ul class="o-list-inline">
            <li
              v-for="(item, index) in contrastErrors"
              :key="index"
              class="o-list-inline__item"
            >
              <strong>{{ item.name }}</strong>: {{ contrastThresholds[item.level] }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Edit Modal -->
    <Modal
      v-if="displayEdit"
      @emitClose="displayEdit = false"
    >
      <h2 class="h4">{{ baseVar.name }}</h2>
      <SelectColor
        :reference="`${themeId}_${baseVarId}`"
        :hasHexOption="true"
        @emitColor="setVal"
      />
    </Modal>
  </div>
</template>

<script>
import SelectColor from '@/components/SelectColor';
import SwatchReference from '@/components/SwatchReference';
import Modal from 'vue-base/components/Modal';
import Icon from 'vue-base/components/Icon';
import colorContrast from '@/mixins/colorContrast';
import themeMappings from '@/mixins/themeMappings';

export default {
  props: {
    themeId: {
      type: String,
      required: true,
    },
    baseVarId: {
      type: String,
      required: true,
    },
  },
  components: {
    SwatchReference,
    SelectColor,
    Modal,
    Icon,
  },
  mixins: [
    colorContrast,
    themeMappings,
  ],
  data() {
    return {
      displayEdit: false,

    };
  },
  computed: {
    theme() {
      return this.$store.state.themes.themes[this.themeId];
    },
    baseVar() {
      return this.$store.state.themes.themeVars[this.baseVarId];
    },
    hex() {
      const themeOverride = this.theme.vals[this.baseVarId];
      if (themeOverride) {
        if (themeOverride.hex) {
          return themeOverride.hex;
        }
        return this.$store.state.colors.shades[themeOverride.shade].hex;
      }
      return this.$store.state.colors.shades[this.baseVar.val].hex;
    },
    /**
     * Computes any accessibility errors for this variable using it's map in the current theme
     *
     * @returns {Array} Error objects.
     */
    contrastErrors() {
      if (this.themeMappings.length > 0) {
        const arr = [];
        for (let i = 0; i < this.themeMappings.length; i += 1) {
          const key = this.themeMappings[i];
          const mapping = this.$store.state.themes.map[key];
          const oppRef = mapping.a === this.baseVarId ? mapping.b : mapping.a;
          const oppHex = this.getOppositeHex(oppRef);
          if (!this.isHigherThanThreshold(this.hex, oppHex, mapping.level)) {
            arr.push({
              name: this.$store.state.themes.themeVars[oppRef].name,
              level: mapping.level,
            });
          }
        }
        return arr;
      }
      return [];
    },
    // This is for themeMappings
    reference() {
      return this.baseVarId;
    },
    classObj() {
      if (this.contrastErrors.length > 0) {
        return ['u-b', 'u-b-theme-error'];
      }
      return null;
    },
  },
  methods: {
    setVal(obj) {
      if (obj.hex) {
        this.$store.dispatch('themes/setThemeVal', {
          themeId: this.themeId,
          varId: this.baseVarId,
          hex: obj.hex,
        });
      } else {
        this.$store.dispatch('themes/setThemeVal', {
          themeId: this.themeId,
          varId: this.baseVarId,
          shade: obj.shade,
        });
      }
      this.displayEdit = false;
    },
    /**
     * Finds the hex value of the variable reference in this theme.
     *
     * @param {String} ref The variable reference ID.
     *
     * @returns {String} The variables associated hex code in this theme.
     */
    getOppositeHex(ref) {
      const themeRef = this.$store.state.themes.themes[this.themeId].vals[ref];
      if (themeRef) {
        if (themeRef.hex) {
          return themeRef.hex;
        }
        return this.$store.state.colors.shades[themeRef.shade].hex;
      }
      return this.$store.state.colors.shades[this.$store.state.themes.themeVars[ref].val].hex;
    },
  },
};
</script>
