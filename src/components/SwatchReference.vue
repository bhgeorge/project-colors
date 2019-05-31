<template lang="html">
  <div class="u-d-flex u-f-align-center">
    <div class="u-p-s u-m-right-xs" :style="{ backgroundColor: hex }"></div>
    <p>{{ name }}</p>
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
  },
};
</script>
