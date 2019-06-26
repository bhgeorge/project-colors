<template>
  <Layout>
    <section class="o-section">
      <div class="o-container">
        <input class="c-input h1" type="text" name="name" v-model="paletteName" />
        <ul class="o-list-bare">
          <li v-for="hue in order" :key="hue" class="o-list-bare__item">
            <Hue :reference="hue" />
          </li>
          <li class="o-list-bar__item">
            <a role="button" @click="addHue">
              <Icon type="add" :modifiers="['u-font-vert-mid']" /> Add Hue
            </a>
          </li>
        </ul>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Default';
import Hue from '@/components/Hue';
import Icon from 'vue-base/components/Icon';
import randomId from '@/mixins/randomId';

export default {
  name: 'home',
  components: {
    Layout,
    Hue,
    Icon,
  },
  mixins: [
    randomId,
  ],
  data() {
    return {
      rollingId: 0,
    };
  },
  computed: {
    paletteName: {
      get() {
        return this.$store.state.colors.name;
      },
      set(value) {
        this.$store.dispatch('colors/setName', value);
      },
    },
    order() {
      return this.$store.state.colors.order;
    },
    hues() {
      return this.$store.state.colors.hues;
    },
    update() {
      return this.$store.state.colors.update;
    },
  },
  methods: {
    addHue() {
      const obj = {
        name: 'Gray',
        shades: [],
        id: this.generateRandomId(),
      };
      this.$store.dispatch('colors/addHue', obj);
    },
  },
};
</script>
