<template lang="html">
  <div class="c-swatch">
    <label :for="`${shade.id}`" class="c-swatch__color" :style="styleObj">
      <span class="u-visually-hidden">Color</span>
    </label>
    <div class="u-p-xs">
      <!-- TODO: Update this to use the UUIDs -->
      <input
        :id="`${shade.id}`"
        class="u-visually-hidden"
        type="color"
        v-model="shadeHex"
      />
      <div class="u-flex u-flex--align-baseline u-p-bot u-color-gray-dark u-font-bold">
        <p class="u-font-bold u-m-right-s">{{ hue.name }}</p>
        <!-- TODO: Update this to use the UUIDs -->
        <label class="u-visually-hidden" :for="`${shade.id}__hex`">Hex</label>
        <input
          :id="`${shade.id}__hex`"
          class="c-input c-input--inline"
          type="text"
          v-model="shadeName"
        />
      </div>
      <label for=""></label>
      <input
        class="c-input"
        type="text"
        v-model="shadeHex"
      />
      <a href="#" class="u-font-xs u-m-right" @click.prevent="openDetail" role="button">Detail</a>
      <a href="#" class="u-font-xs" @click.prevent="removeShade">Remove</a>
    </div>
    <Modal v-if="showDetail" @emitClose="showDetail = false">
      <h4 class="h4 u-font-serif u-font-bold u-m-bot">WCAG Accesible Matches</h4>
      <div class="o-grid o-grid--12 o-grid--4-4-4@m">
        <div>
          <h5 class="h5 u-b-bot u-b-gray-light u-p-bot-xs u-m-bot-s">UI (3.0)</h5>
          <ul class="o-list-bare">
            <li v-for="item in wcag.ui" :key="item.id" class="o-list-bare__item">
              <SwatchReference :hex="item.hex" :name="item.name" />
            </li>
          </ul>
        </div>
        <div>
          <h5 class="h5 u-b-bot u-b-gray-light u-p-bot-xs u-m-bot-s">AA Text (4.5)</h5>
          <ul class="o-list-bare">
            <li v-for="item in wcag.aa" :key="item.id" class="o-list-bare__item">
              <SwatchReference :hex="item.hex" :name="item.name" />
            </li>
          </ul>
        </div>
        <div>
          <h5 class="h5 u-b-bot u-b-gray-light u-p-bot-xs u-m-bot-s">AAA Text (7.0)</h5>
          <ul class="o-list-bare">
            <li v-for="item in wcag.aaa" :key="item.id" class="o-list-bare__item">
              <SwatchReference :hex="item.hex" :name="item.name" />
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from 'vue-base/components/Modal';
import SwatchReference from '@/components/SwatchReference';
import colorContrast from '@/mixins/colorContrast';

export default {
  props: {
    parent: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
  },
  components: {
    Modal,
    SwatchReference,
  },
  mixins: [
    colorContrast,
  ],
  data() {
    return {
      localShade: '',
      localHex: '',
      showDetail: false,
      wcag: {
        ui: [],
        aa: [],
        aaa: [],
      },
    };
  },
  computed: {
    hue() {
      return this.$store.state.colors.hues[this.parent];
    },
    shade() {
      return this.$store.state.colors.shades[this.reference];
    },
    shadeHex: {
      get() {
        return this.shade.hex;
      },
      set(value) {
        this.$store.dispatch('colors/updateShade', {
          id: this.reference,
          hex: value,
          name: this.shade.name,
        });
      },
    },
    shadeName: {
      get() {
        return this.shade.name;
      },
      set(value) {
        this.$store.dispatch('colors/updateShade', {
          id: this.shade.id,
          hex: this.shade.hex,
          name: value,
        });
      },
    },
    styleObj() {
      return {
        backgroundColor: this.shadeHex,
      };
    },
  },
  methods: {
    computeWcag() {
      this.wcag = { ui: [], aa: [], aaa: [] }; // eslint-disable-line
      const hues = { ...this.$store.state.colors.hues };
      const shades = { ...this.$store.state.colors.shades };
      const hueKeys = Object.keys(hues);
      for (let i = 0; i < hueKeys.length; i += 1) {
        const hue = hues[hueKeys[i]];
        for (let j = 0; j < hue.shades.length; j += 1) {
          const shade = shades[hue.shades[j]];
          const contrast = this.testContrast(this.shadeHex, shade.hex);
          if (contrast >= 7) {
            this.wcag.aaa.push({ hex: shade.hex, name: `${hue.name} ${shade.name}`, id: shade.id });
          } else if (contrast >= 4.5) {
            this.wcag.aa.push({ hex: shade.hex, name: `${hue.name} ${shade.name}`, id: shade.id });
          } else if (contrast >= 3) {
            this.wcag.ui.push({ hex: shade.hex, name: `${hue.name} ${shade.name}`, id: shade.id });
          }
        }
      }
    },
    openDetail() {
      this.computeWcag();
      this.showDetail = true;
    },
    removeShade() {
      this.$store.dispatch('colors/removeShade', {
        shadeId: this.reference,
        hueId: this.parent,
      });
    },
  },
};
</script>
