<template>
  <Layout>
    <section class="o-section">
      <div class="o-container">
        <ul class="o-list-bare">
          <li v-for="(hue, majorIndex) in hues" :key="hue.id" class="o-list-bare__item">
            <input class="c-input" type="text" v-model="hue.name">
            <ul class="o-list-inline u-m-top-l u-m-bot-xxl">
              <Draggable v-model="hue.shades" :options="{draggable: '.draggable'}">
                <li
                  v-for="(shade, index) in hue.shades"
                  :key="shade.id"
                  class="draggable o-list-inline__item"
                >
                  <Swatch
                    :hue="hue.name"
                    :shade="shade.name"
                    :hex="shade.hex"
                    :majorIndex="majorIndex"
                    :index="index"
                    @updateSwatch="updateSwatch"
                  />
                </li>
                <li class="o-list-inline__item c-swatch c-swatch--no-shadow" slot="footer">
                  <a class="u-clickarea" role="button" @click="addShade(majorIndex)">
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
      hues: [],
      rollingId: 0,
    };
  },
  computed: {
    update() {
      return this.$store.state.colors.update;
    },
  },
  methods: {
    generateRandomId() {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let str = '';
      for (let i = 0; i < 16; i += 1) {
        str += chars.charAt(Math.round(Math.random() * 62));
      }
      return str;
    },
    addHue() {
      this.rollingId += 1;
      const obj = {
        name: 'Gray',
        shades: [
          {
            name: 'Base',
            hex: '#cdcdcd',
          },
        ],
        id: this.generateRandomId(),
      };
      this.hues.push(obj);
    },
    addShade(index) {
      const obj = {
        name: 'Dark',
        hex: '#303030',
        id: this.generateRandomId(),
      };
      this.hues[index].shades.push(obj);
    },
    updateSwatch(obj) {
      const swatch = this.hues[obj.majorIndex].shades[obj.index];
      swatch.name = obj.shade;
      swatch.hex = obj.hex;
    },
  },
  watch: {
    update() {
      if (this.update) {
        this.hues = JSON.parse(JSON.stringify(this.$store.state.colors.hues));
        this.rollingId = this.$store.state.colors.rollingId;
      }
    },
  },
  created() {
    this.hues = JSON.parse(JSON.stringify(this.$store.state.colors.hues));
    this.rollingId = this.$store.state.colors.rollingId;
  },
  beforeDestroy() {
    this.$store.dispatch('colors/setBulk', this.hues);
  },
};
</script>
