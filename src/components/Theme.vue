<template lang="html">
  <div class="">
    <div class="u-m-bot">
      <label :for="`${reference}_name`">Theme Name</label>
      <input
        :id="`${reference}_name`"
        class="c-input__input c-input__input--subtle"
        type="text"
        name="theme_name"
        v-model="themeName"
      >
    </div>
    <ul class="o-list-bare">
      <li v-for="(item, key) in themeVars" :key="key" class="o-list-bare__item">
        <ThemeOverrideVariable
          :themeId="reference"
          :baseVarId="key"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ThemeOverrideVariable from '@/components/ThemeOverrideVariable';

export default {
  props: {
    reference: {
      type: String,
      required: true,
    },
  },
  components: {
    ThemeOverrideVariable,
  },
  computed: {
    themeVars() {
      return this.$store.state.themes.themeVars;
    },
    theme() {
      return this.$store.state.themes.themes[this.reference];
    },
    themeName: {
      get() {
        return this.theme.name;
      },
      set(value) {
        this.$store.dispatch('themes/setThemeName', {
          id: this.reference,
          name: value,
        });
      },
    },
  },
};
</script>
