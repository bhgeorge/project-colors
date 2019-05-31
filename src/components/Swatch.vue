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
        v-model="localHex"
        @change="updateSwatch"
      />
      <div class="u-flex u-flex--align-baseline u-p-bot u-color-gray-dark u-font-bold">
        <p class="u-font-bold u-m-right-s">{{ hue.name }}</p>
        <!-- TODO: Update this to use the UUIDs -->
        <label class="u-visually-hidden" :for="`${shade.id}__hex`">Hex</label>
        <input
          :id="`${shade.id}__hex`"
          class="c-input c-input--inline"
          type="text"
          v-model="localShade"
          @keyup="updateSwatch"
          @change="updateSwatch"
        />
      </div>
      <label for=""></label>
      <input
        class="c-input"
        type="text"
        v-model="localHex"
        @keyup="updateSwatch"
        @change="updateSwatch"
      />
      <a href="#" @click="openDetail">Detail</a>
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
import Modal from '@/components/Modal';
import SwatchReference from '@/components/SwatchReference';
import colorContrast from '@/mixins/colorContrast';

export default {
  props: {
    hue: {
      type: Object,
      required: true,
    },
    shade: {
      type: Object,
      required: true,
    },
    hueIndex: {
      type: Number,
      required: true,
    },
    shadeIndex: {
      type: Number,
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
    styleObj() {
      return {
        backgroundColor: this.localHex,
      };
    },
    hues() {
      return this.$store.state.colors.hues;
    },
  },
  methods: {
    computeWcag() {
      this.wcag = { ui: [], aa: [], aaa: [] }; // eslint-disable-line
      for (let i = 0; i < this.hues.length; i += 1) {
        const hue = this.hues[i];
        for (let j = 0; j < hue.shades.length; j += 1) {
          const shade = hue.shades[j];
          const contrast = this.testContrast(this.localHex, shade.hex);
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
    updateSwatch() {
      const obj = {
        hueIndex: this.hueIndex,
        shadeIndex: this.shadeIndex,
        shade: {
          name: this.localName,
          hex: this.localHex,
          id: this.shade.id,
        },
      };
      this.$store.dispatch('colors/updateSwatch', obj);
    },
  },
  created() {
    this.localName = this.shade.name;
    this.localHex = this.shade.hex;
  },
};
</script>
