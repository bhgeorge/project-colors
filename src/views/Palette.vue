<template>
  <div>
    <section class="o-section">
      <div class="o-container">
        <h1>Palette</h1>
        <!-- Hues -->
        <ul>
          <CardHue
            v-for="hueId in order"
            :key="hueId"
            :hueId="hueId"
          />
        </ul>
        <!-- Add Hue -->
        <TileAdd />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import CardHue from '@/components/palette/CardHue.vue';
import TileAdd from '@/components/palette/TileAdd.vue';

export default defineComponent({
  name: 'Palette',

  components: {
    CardHue,
    TileAdd,
  },

  computed: {
    ...mapState('palette', ['order']),
  },
});
</script>
