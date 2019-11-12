<template lang="html">
  <div class="u-d-flex u-f-align-center">
    <div class="u-p-s u-m-right-xs" :style="{ backgroundColor: hex }"></div>
    <div>
      <p>{{ name }}</p>
      <p
        v-if="contrast"
        class="u-font-xs u-c-gray"
      >
        {{ contrast }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hex: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contrast: {
      type: String,
      required: false,
    },
  },
};
</script>
