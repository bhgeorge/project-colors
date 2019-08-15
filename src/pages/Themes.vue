<template lang="html">
  <Layout>
    <section class="o-section" v-if="hasNoColors">
      <div class="o-container">
        <p class="u-font-l u-font-center">
          You need to <router-link :to="{ name: 'home' }">create a palette</router-link> before you can begin theming it.
        </p>
      </div>
    </section>
    <section class="o-section" v-else>
      <div class="o-container">
        <h1 class="h2 u-font-bold u-m-bot-xs">Themes</h1>
        <ul class="c-tabs">
          <li :class="{ 'o-cover-link': true, 'c-tabs__tab': true, 'active': activeTab === 0}">
            <a
              href="#"
              class="o-cover-link__item"
              role="tab"
              @click.prevent="setActiveTab(0)">
              Base
            </a>
          </li>
          <li
            v-for="(theme, key, index) in themes"
            :key="key"
            :class="{ 'o-cover-link': true, 'c-tabs__tab': true, 'active': index + 1 === activeTab}"
          >
            <a
              href="#"
              class="o-cover-link__item"
              role="tab"
              @click.prevent="setActiveTab(index + 1)"
            >
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
        <div
          v-show="activeTab === 0"
          class="c-tab"
          :aria-hidden="activeTab !== 0"
          role="tabpael"
        >
          <ul class="o-list-bare">
            <li v-for="variable in themeVars" :key="variable.id" class="o-list-bare__item">
              <ThemeVariable :reference="variable.id" />
            </li>
          </ul>
          <div class="u-m-top">
            <button
              class="c-btn c-btn--primary u-d-inline-block"
              @click="addVariable"
            >
              Add Variable
            </button>
          </div>
        </div>
        <!-- Theme Tabs -->
        <div
          v-for="(theme, key, index) in themes"
          :key="key"
          class="c-tab"
          v-show="index + 1 === activeTab"
          :aria-hidden="index + 1 !== activeTab"
          role="tabpanel"
        >
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
  data() {
    return {
      activeTab: 0,
    };
  },
  computed: {
    themeVars() {
      return this.$store.state.themes.themeVars;
    },
    themes() {
      return this.$store.state.themes.themes;
    },
    hasNoColors() {
      return this.$store.state.colors.order.length === 0;
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
    setActiveTab(index) {
      this.activeTab = index;
    },
  },
};
</script>
