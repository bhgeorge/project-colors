<template>
  <li class="c-card c-card--outline">
    <h3>{{ shade.name }}</h3>
    <div
      class="c-swatch"
      :style="{ background: shade.hex }"
    />
    <!-- TODO: Put this in some fun UI -->
    <VuexForm :formStructure="formStructure" />
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { Shade } from '@/store/palette/types';
import { EDIT_SHADE } from '@/store/palette/mutation-types';
import VuexForm from '@/components/form/VuexForm.vue';

export default defineComponent({
  name: 'CardShade',

  props: {
    shadeId: {
      type: String,
      required: true,
    },
  },

  components: {
    VuexForm,
  },

  data() {
    return {
      formStructure: {
        id: 'card-shade',
        fields: [
          {
            component: 'InputText',
            id: 'card-shade__name',
            label: 'Shade name',
            name: 'shadeName',
            required: true,
          },
          {
            component: 'InputText',
            id: 'card-shade__hex',
            label: 'Hex',
            name: 'shadeHex',
            required: true,
            // TODO: Validation for isHex
          },
        ],
      },
    };
  },

  computed: {
    ...mapState('palette', ['shades']),

    shade(): Shade {
      return this.shades[this.shadeId];
    },
  },
});
</script>
