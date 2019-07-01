<template lang="html">
  <div class="">
    <form @submit.prevent="emitVal">
      <!-- Hue Select -->
      <div class="u-m-bot">
        <label :for="`${reference}_val_hue`">Hue</label>
        <select
          :id="`${reference}_val_hue`"
          class="c-input__input c-input__input--select u-d-block"
          name="variable_hue"
          v-model="selectedHue"
          :required="!hasHexOption"
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
      <div
        v-show="shades"
        class="u-m-bot"
        role="radiogroup"
        :aria-labelledby="`${reference}_val_shade_label`">
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
      <!-- Hex -->
      <div v-if="hasHexOption" class="u-p-top u-b-top u-b-theme-base-base u-m-bot">
        <div class="u-d-flex">
          <!-- Color Input -->
          <label
            class="u-p-s u-m-right-xs"
            :for="`${reference}_val_color`"
            :style="styleObj"
          >
            <span class="u-visually-hidden">Color</span>
          </label>
          <input
            :id="`${reference}_val_color`"
            class="u-visually-hidden"
            type="color"
            name="color"
            v-model="hex"
          >
          <!-- Hex Input -->
          <div class="u-m-left">
            <label :for="`${reference}_val_hex`">Hex</label>
            <input
              :id="`${reference}_val_hex`"
              class="c-input__input"
              type="text"
              name="hex"
              v-model="hex">
          </div>
        </div>
      </div>
      <!-- Submit -->
      <button class="c-btn c-btn--primary" type="submit" name="setVal">Submit</button>
    </form>
  </div>
</template>

<script>
import SwatchReference from '@/components/SwatchReference';

// TODO: Get default values on open
export default {
  props: {
    reference: {
      type: String,
      required: true,
    },
    hasHexOption: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SwatchReference,
  },
  data() {
    return {
      selectedHue: null,
      selectedShade: null,
      hex: null,
    };
  },
  computed: {
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
    styleObj() {
      if (!this.hex) {
        return null;
      }
      return {
        background: this.hex,
      };
    },
  },
  methods: {
    emitVal() {
      if (!this.selectedShade && !this.hex) {
        return;
      }

      if (this.hex) {
        this.$emit('emitColor', {
          hex: this.hex,
          id: this.reference,
        });
      } else {
        this.$emit('emitColor', {
          shade: this.selectedShade,
          id: this.reference,
        });
      }
    },
  },
};
</script>
