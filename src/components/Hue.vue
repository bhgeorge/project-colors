<template lang="html">
  <div class="u-p-bot-xl">
    <div class="h3">
      <label class="u-visually-hidden" :for="`${reference}_name`">Hue Name</label>
      <input
        :id="`${reference}_name`"
        class="c-input__input c-input__input--subtle"
        type="text"
        v-model="hueName"
      />
    </div>
    <ul class="o-list-inline u-m-top-l">
      <Draggable v-model="shades" draggable=".draggable">
        <li
          v-for="shade in shades"
          :key="shade"
          class="draggable o-list-inline__item"
        >
          <Swatch
            :parent="reference"
            :reference="shade"
          />
        </li>
        <li class="o-list-inline__item c-swatch c-swatch--no-shadow" slot="footer">
          <a class="u-clickarea" role="button" @click="addShade">
            <div class="c-swatch__add u-font-xs u-color-gray">
              Add {{ hue.name }} Shade
            </div>
          </a>
        </li>
      </Draggable>
    </ul>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import Swatch from '@/components/Swatch';
import randomId from '@/mixins/randomId';

export default {
  props: {
    reference: {
      type: String,
      required: true,
    },
  },
  components: {
    Draggable,
    Swatch,
  },
  mixins: [
    randomId,
  ],
  computed: {
    hue() {
      return this.$store.state.colors.hues[this.reference];
    },
    shades: {
      get() {
        return this.hue.shades;
      },
      set(value) {
        this.$store.dispatch('colors/updateHue', {
          id: this.reference,
          name: this.hueName,
          shades: value,
        });
      },
    },
    hueName: {
      get() {
        return this.hue.name;
      },
      set(value) {
        this.$store.dispatch('colors/updateHue', {
          id: this.reference,
          name: value,
          shades: this.hue.shades,
        });
      },
    },
  },
  methods: {
    addShade() {
      // TODO: Update this to be a shade of w/e color
      const obj = {
        id: this.reference,
        shade: {
          name: 'Dark',
          hex: '#303030',
          id: this.generateRandomId(),
        },
      };
      this.$store.dispatch('colors/addShade', obj);
    },
    updateHue() {
      this.$store.dispatch('colors/updateHue', { ...this.hue, name: this.localName });
    },
  },
  created() {
    this.localName = this.hue.name;
  },
};
</script>
