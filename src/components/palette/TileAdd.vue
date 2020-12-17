<template>
  <div class="o-cover-link c-card c-card__outline">
    <button
      type="button"
      class="o-cover-link__item"
      :name="buttonName"
      @click="handleAdd"
    >
      <!-- TODO: Icon -->
      Add
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import { ADD_SHADE } from '@/store/palette/mutation-types';
import generateUUID from '@/utils/methods/generate-uuid';

export default defineComponent({
  name: 'TileAdd',

  props: {
    hueId: {
      type: String,
      default: '',
    },
  },

  computed: {
    buttonName(): string {
      return this.hueId ? 'addShade' : 'addHue';
    },
  },

  methods: {
    ...mapMutations('palette', [ADD_SHADE]),

    handleAdd() {
      this[ADD_SHADE]({
        shade: {
          name: 'Shade',
          id: generateUUID(),
          hex: '#00a7cd',
        },
        hueId: this.hueId,
      });
    },
  },
});
</script>
