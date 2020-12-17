<template>
  <div
    v-show="field.state !== states.hidden"
    :class="['c-input', this.state]"
  >
    <!-- Label -->
    <label
      :for="`vf-${fieldId}`"
      class="c-input__label"
    >
      {{ field.label }}<sup v-if="field.required">*</sup>
    </label>
    <!-- Input -->
    <input
      :aria-describedby="field.state === states.ERROR ? `vf-${fieldId}__error` : false"
      :aria-required="field.required"
      :autocomplete="field.autocomplete || false"
      :id="`vf-${fieldId}`"
      :name="field.name"
      @blur="validateField()"
      class="c-input__input"
      type="text"
      v-model="fieldVal"
    >
    <!-- Error -->
    <p
      :id="`vf-${fieldId}__error`"
      class="c-input__error"
      v-if="field.state === states.ERROR"
    >
      {{ field.errorText }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import fieldMixin from '../../mixins/field.mixin';

export default defineComponent({
  mixins: [
    fieldMixin,
  ],

  computed: {
    fieldVal: {
      get(): string {
        return this.field.value as string;
      },
      set(val: string) {
        this.debouncedUpdateFieldValue({ id: this.field.id, val });
      },
    },
  },
});
</script>
