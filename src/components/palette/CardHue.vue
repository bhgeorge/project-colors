<template>
  <li class="c-card c-card--outline">
    <h2 class="c-card__title">{{ hue.name }}</h2>
    <main class="c-card__body">
      <ul>
        <CardShade
          v-for="shadeId in hue.shades"
          :key="shadeId"
          :shadeId="shadeId"
        />
      </ul>
    </main>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { Hue } from '@/store/palette/types';
import CardShade from '@/components/palette/CardShade.vue';

export default defineComponent({
  name: 'CardHue',

  props: {
    hueId: {
      type: String,
      required: true,
    },
  },

  components: {
    CardShade,
  },

  computed: {
    ...mapState('palette', ['hues']),

    hue(): Hue {
      return this.hues[this.hueId];
    },
  },
});
</script>
