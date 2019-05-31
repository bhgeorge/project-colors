<template>
  <Layout>
    <section class="o-section">
      <div class="o-container">
        <ul class="o-list-bare">
          <li v-for="(hue, hueIndex) in hues" :key="hue.id" class="o-list-bare__item">
            <input class="c-input" type="text" v-model="hue.name">
            <ul class="o-list-inline u-m-top-l u-m-bot-xxl">
              <Draggable v-model="hue.shades" :options="{draggable: '.draggable'}">
                <li
                  v-for="(shade, shadeIndex) in hue.shades"
                  :key="shade.id"
                  class="draggable o-list-inline__item"
                >
                  <Swatch
                    :hue="hue"
                    :shade="shade"
                    :hueIndex="hueIndex"
                    :shadeIndex="shadeIndex"
                  />
                </li>
                <li class="o-list-inline__item c-swatch c-swatch--no-shadow" slot="footer">
                  <a class="u-clickarea" role="button" @click="addShade(hueIndex)">
                    <div class="c-swatch__add u-font-xs u-color-gray">
                      Add {{ hue.name }} Shade
                    </div>
                  </a>
                </li>
              </Draggable>
            </ul>
          </li>
          <li class="o-list-bar__item">
            <a role="button" @click="addHue">Add Hue</a>
          </li>
        </ul>
      </div>
    </section>
  </Layout>
</template>

<script>
import Draggable from 'vuedraggable';
import Layout from '@/layouts/Default';
import Swatch from '@/components/Swatch';

export default {
  name: 'home',
  components: {
    Layout,
    Draggable,
    Swatch,
  },
  data() {
    return {
      rollingId: 0,
    };
  },
  computed: {
    hues() {
      return this.$store.state.colors.hues;
    },
    update() {
      return this.$store.state.colors.update;
    },
  },
  methods: {
    // TODO: Make this based on time to prevent 1 in a millions
    generateRandomId() {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let str = '';
      for (let i = 0; i < 16; i += 1) {
        str += chars.charAt(Math.round(Math.random() * 62));
      }
      return str;
    },
    addHue() {
      const obj = {
        name: 'Gray',
        shades: [
          {
            name: 'Base',
            hex: '#cdcdcd',
            id: this.generateRandomId(),
          },
        ],
        id: this.generateRandomId(),
      };
      this.$store.dispatch('colors/addHue', obj);
    },
    addShade(index) {
      // TODO: Update this to be a shade of w/e color
      const obj = {
        index,
        shade: {
          name: 'Dark',
          hex: '#303030',
          id: this.generateRandomId(),
        },
      };
      this.$store.dispatch('colors/addShade', obj);
    },
  },
};
</script>
