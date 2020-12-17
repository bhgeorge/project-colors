<template>
  <form
    :aria-describedby="`${formStructure.id}__required-msg`"
    @submit="handleSubmit"
  >
    <!-- Required note -->
    <p
      :id="`${formStructure.id}__required-msg`"
      class="u-font-xs u-m-bot"
    >
      {{ requiredText }}
    </p>
    <!-- TODO: Global error alert -->
    <!-- Groups -->
    <div
      v-for="(group, index) in groupedFields"
      :key="index"
      :class="{ 'c-card--outline': group.name }"
      class="c-card"
    >
      <h3
        v-if="group.name"
        class="card__title"
      >
        {{ group.name }}
      </h3>
      <!-- Fields -->
      <div class="c-card__body">
        <div
          v-for="field in group.fields"
          :key="field.id"
          class="u-m-bot"
        >
          <component
            :is="field.component"
            :fieldId="field.id"
            :formId="formStructure.id"
            ref="field"
          />
        </div>
      </div>
    </div>
    <!-- Submit -->
    <div class="u-p">
      <button
        class="c-btn c-btn--primary"
        name="formSubmit"
        type="submit"
      >
        {{ formStructure.submitText || 'Submit' }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { mapMutations } from 'vuex';
import { FormStructure, GroupStructure } from './store/types';
import { ADD_FORM } from './store/mutation-types';
// Fields
import InputText from './components/text/InputText.vue';

export default defineComponent({
  name: 'VuexForm',

  props: {
    formStructure: {
      type: Object as PropType<FormStructure>,
      required: true,
    },
  },

  components: {
    InputText,
  },

  computed: {
    groupedFields(): Array<GroupStructure> {
      const formGroups = this.formStructure.groups || [];
      const groups = formGroups.slice(0);

      const formFields = this.formStructure.fields || [];
      // Append all loose fields into a group at the end
      if (formFields.length > 0) {
        groups.push({
          name: '',
          fields: formFields.slice(0) || [],
        });
      }

      return groups;
    },

    allRequired(): boolean {
      for (let i = 0; i < this.groupedFields.length; i += 1) {
        for (let j = 0; j < this.groupedFields[i].fields.length; j += 1) {
          if (this.groupedFields[i].fields[j].required) {
            return false;
          }
        }
      }
      return true;
    },

    requiredText(): string {
      return this.allRequired ? 'All fields required' : '* Required fields';
    },
  },

  methods: {
    ...mapMutations('forms', [ADD_FORM]),
  },

  created() {
    this[ADD_FORM](this.formStructure);
  },
});
</script>
