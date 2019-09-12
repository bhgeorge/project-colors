<template lang="html">
  <div class="c-theme-variable">
    <div class="u-m-bot u-p u-b u-b-theme-base u-pos-relative">
      <!-- Remove Variable -->
      <button
        class="c-btn--ui c-btn--close"
        type="button"
        name="removeVariable"
        @click="removeVariable"
      >
        <Icon type="close" :modifiers="['o-icon--l']" />
        <span class="u-visually-hidden">Remove theme variable</span>
      </button>
      <!-- Variable Name -->
      <div class="u-m-bot-s">
        <label :for="`${reference}_name`">Variable Name</label>
        <input
          :id="`${reference}_name`"
          class="c-input__input"
          type="text"
          name="variable_name"
          v-model="variableName"
        />
      </div>
      <!-- Variable Value -->
      <div>
        <label :for="`${reference}_val`">Color</label>
        <input :id="`${reference}_val`" type="hidden" name="variable_val" v-model="variableVal">
        <div class="c-card o-cover-link u-d-flex u-p-xs">
          <SwatchReference
            v-if="shadeReference"
            :hex="shadeReference.hex"
            :name="shadeReference.name"
          />
          <a href="#" class="o-cover-link__item" role="button" @click.prevent="showShadeSelect">
            <Icon type="edit" :modifiers="['u-m-left-s']" />
            <span class="u-visually-hidden">Change Color</span>
          </a>
        </div>
      </div>
      <!-- Theme Mapping -->
      <div class="u-b-top u-b-theme-base u-m-top-xs u-p-top-s">
        <details>
          <summary>Accessiblity Mapping</summary>
          <ul class="o-list-bare">
            <li
              v-for="item in themeMappings"
              :key="item"
              class="o-list-bare__item"
            >
              <ThemeAccessibilityMapItem
                :reference="item"
                :base="reference"
              />
            </li>
          </ul>
          <a href="#" role="button" @click.prevent="addMapping">
            <Icon type="add" :modifiers="['u-font-align-center']" /> Add Mapping
          </a>
        </details>
      </div>
    </div>
    <!-- Value Select Modal -->
    <Modal
      v-if="displayShadeSelect"
      @emitClose="displayShadeSelect = false"
    >
      <form @submit.prevent="setVal">
        <!-- Hue Select -->
        <div class="u-m-bot">
          <label :for="`${reference}_val_hue`">Hue</label>
          <select
            :id="`${reference}_val_hue`"
            class="c-input__input c-input__input--select u-d-block"
            name="variable_hue"
            v-model="selectedHue"
            required
          >
            <option
              v-for="hue in hues"
              :key="hue.id"
              :value="hue.id"
            >
              {{ hue.name }}
            </option>
          </select>
        </div>
        <!-- Shade Select -->
        <div v-show="shades" role="radiogroup" :aria-labelledby="`${reference}_val_shade_label`">
          <p :id="`${reference}_val_shade_label`">Shade</p>
          <div
            v-for="shade in shades"
            :key="shade.id"
            class="c-input--radio-color"
          >
            <input
              type="radio"
              :id="`${reference}_shade_${shade.id}`"
              class="u-visually-hidden"
              name="shade"
              :value="shade.id"
              v-model="selectedShade"
              required
            >
            <label class="c-input--radio-color__label" :for="`${reference}_shade_${shade.id}`">
              <SwatchReference
                :hex="shade.hex"
                :name="shade.name"
              />
            </label>
          </div>
        </div>
        <!-- Submit -->
        <button class="c-btn c-btn--primary" type="submit" name="setVal">Submit</button>
      </form>
    </Modal>
  </div>
</template>

<script>
import SwatchReference from '@/components/SwatchReference';
import ThemeAccessibilityMapItem from '@/components/ThemeAccessibilityMapItem';
import Modal from 'vue-base/components/Modal';
import Icon from 'vue-base/components/Icon';
import randomId from '@/mixins/randomId';
import themeMappings from '@/mixins/themeMappings';

export default {
  props: {
    reference: {
      type: String,
      required: true,
    },
  },
  components: {
    SwatchReference,
    ThemeAccessibilityMapItem,
    Modal,
    Icon,
  },
  mixins: [
    randomId,
    themeMappings,
  ],
  data() {
    return {
      displayShadeSelect: false,
      selectedHue: null,
      selectedShade: null,
    };
  },
  computed: {
    variable() {
      return this.$store.state.themes.themeVars[this.reference];
    },
    variableName: {
      get() {
        return this.variable.name;
      },
      set(value) {
        this.$store.dispatch('themes/updateThemeVar', {
          id: this.reference,
          name: value,
          val: this.variableVal,
        });
      },
    },
    variableVal: {
      get() {
        return this.variable.val;
      },
      set(value) {
        this.$store.dispatch('themes/updateThemeVar', {
          id: this.reference,
          name: this.variableName,
          val: value,
        });
      },
    },
    shadeReference() {
      if (this.variableVal) {
        return this.$store.state.colors.shades[this.variableVal];
      }
      return null;
    },
    hues() {
      return this.$store.state.colors.hues;
    },
    shades() {
      if (!this.selectedHue) {
        return null;
      }
      const arr = [];
      const shadeIds = this.$store.state.colors.hues[this.selectedHue].shades;
      for (let i = 0; i < shadeIds.length; i += 1) {
        const shade = this.$store.state.colors.shades[shadeIds[i]];
        arr.push({
          id: shade.id,
          name: shade.name,
          hex: shade.hex,
        });
      }
      return arr;
    },
  },
  methods: {
    showShadeSelect() {
      this.displayShadeSelect = true;
    },
    setVal() {
      this.$store.dispatch('themes/updateThemeVar', {
        name: this.variableName,
        id: this.reference,
        val: this.selectedShade,
      });
      this.displayShadeSelect = false;
    },
    addMapping() {
      this.$store.dispatch('themes/addMapping', {
        a: this.reference,
        b: '',
        level: null,
        id: this.generateRandomId(),
      });
    },
    removeVariable() {
      for (let i = 0; i < this.themeMappings.length; i += 1) {
        this.$store.dispatch('themes/removeMapping', this.themeMappings[i]);
      }
      this.$store.dispatch('themes/removeThemeVar', this.reference);
    },
  },
};
</script>
