<template lang="html">
  <div class="c-swatch">
    <label :for="`${majorIndex}-${index}`" class="c-swatch__color" :style="styleObj">
      <span class="u-visually-hidden">Color</span>
    </label>
    <div class="u-d-flex">
      <p class="u-text-bold">#</p>
      <input
        :id="`${majorIndex}-${index}`"
        class="u-visually-hidden"
        type="color"
        v-model="localHex"
        @change="updateSwatch"
      />
    </div>
    <div class="c-swatch__info">
      <div class="u-flex u-flex--align-baseline u-p-bot u-color-gray-dark u-font-bold">
        <h6 class="u-font-bold u-m-right-s">{{ hue }}</h6>
        <input
          class="c-input c-input--inline"
          type="text"
          v-model="localShade"
          @keyup="updateSwatch"
          @change="updateSwatch"
        />
      </div>
      <input
        class="c-input"
        type="text"
        v-model="localHex"
        @keyup="updateSwatch"
        @change="updateSwatch"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hue: {
      type: String,
      required: true,
    },
    shade: {
      type: String,
      required: true,
    },
    hex: {
      type: String,
      required: true,
    },
    majorIndex: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      localShade: '',
      localHex: '',
    };
  },
  computed: {
    styleObj() {
      return {
        backgroundColor: this.localHex,
      };
    },
  },
  methods: {
    updateSwatch() {
      const obj = {
        shade: this.localShade,
        hex: this.localHex,
        majorIndex: this.majorIndex,
        index: this.index,
      };
      this.$emit('updateSwatch', obj);
    },
  },
  created() {
    this.localShade = this.shade;
    this.localHex = this.hex;
  },
};
</script>
