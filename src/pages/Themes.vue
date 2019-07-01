<template lang="html">
  <Layout>
    <section class="o-section">
      <div class="o-container">
        <h1 class="h2 u-font-bold u-m-bot-xs">Themes</h1>
        <ul class="o-list-inline u-w-100">
          <li class="o-list-inline__item">
            <a href="#" role="tab">
              Base
            </a>
          </li>
          <li v-for="(theme, key) in themes" :key="key" class="o-list-inline__item">
            <a href="#" role="tab">
              {{ theme.name }}
            </a>
          </li>
          <li class="o-list-inline__item">
            <button class="c-btn c-btn--secondary" type="button" name="addTheme" @click="addTheme">
              <Icon type="add" :modifiers="['u-font-vert-mid', 'u-m-right-s']" />
              Add Theme
            </button>
          </li>
        </ul>
        <!-- Theme Vars -->
        <div class="">
          <ul class="o-list-bare">
            <li v-for="variable in themeVars" :key="variable.id" class="o-list-bare__item">
              <ThemeVariable :reference="variable.id" />
            </li>
          </ul>
          <div class="u-m-top">
            <a
              class="c-btn c-btn--primary u-d-inline-block"
              href="#"
              role="button"
              @click.prevent="addVariable"
            >
              Add Variable
            </a>
          </div>
        </div>
        <!-- Theme Tabs -->
        <div v-for="(theme, key) in themes" :key="key">
          <Theme :reference="key" />
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Default';
import ThemeVariable from '@/components/ThemeVariable';
import Theme from '@/components/Theme';
import Icon from 'vue-base/components/Icon';
import randomId from '@/mixins/randomId';

export default {
  components: {
    Layout,
    ThemeVariable,
    Theme,
    Icon,
  },
  mixins: [
    randomId,
  ],
  computed: {
    themeVars() {
      return this.$store.state.themes.themeVars;
    },
    themes() {
      return this.$store.state.themes.themes;
    },
  },
  methods: {
    addVariable() {
      this.$store.dispatch('themes/addThemeVar', {
        id: this.generateRandomId(),
        name: 'theme-base',
        val: null,
      });
    },
    addTheme() {
      this.$store.dispatch('themes/addTheme', {
        id: this.generateRandomId(),
        name: 'New Theme',
        vals: {},
      });
    },
  },
};
</script>
