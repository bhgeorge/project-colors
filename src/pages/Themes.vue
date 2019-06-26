<template lang="html">
  <Layout>
    <section class="o-section">
      <div class="o-container">
        <h1 class="h2 u-font-bold u-m-bot-xs">Themes</h1>
        <div class="">
          <!-- Locked Theme Vars Bar -->
          <div class="">
            <ul class="o-list-bare">
              <li v-for="variable in themeVars" :key="variable.id" class="o-list-bare__item">
                <ThemeVariable :reference="variable.id" />
              </li>
            </ul>
            <div class="u-m-top">
              <a
                class="c-btn c-btn--primary"
                href="#"
                role="button"
                @click="addVariable"
              >
                Add Variable
              </a>
            </div>
          </div>
          <!-- Horizontally Flexible Themes -->
          <div class="">

          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Default';
import ThemeVariable from '@/components/ThemeVariable';
import randomId from '@/mixins/randomId';

export default {
  components: {
    Layout,
    ThemeVariable,
  },
  mixins: [
    randomId,
  ],
  computed: {
    themeVars() {
      return this.$store.state.themes.themeVars;
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
  },
};
</script>
