// import { debounce } from 'lodash';
import { mapState, mapMutations } from 'vuex';
import { SET_FIELD_VAL } from '../store/mutation-types';
import {
  FieldStructure,
  FieldUpdate,
  VuexFormState,
} from '../store/types';

export default {
  props: {
    fieldId: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState('forms', {
      field(state: VuexFormState): FieldStructure {
        return state.fields[this.fieldId];
      },
    }),
  },

  methods: {
    ...mapMutations('forms', [SET_FIELD_VAL]),

    // TODO: Figure out debounce here
    debouncedUpdateFieldValue(fieldUpdate: FieldUpdate) {
      this[SET_FIELD_VAL](fieldUpdate);
    },

    validateField() {
      // Ensure that a value populated
      // this.debouncedUpdateFieldValue.flush();
      // TODO: Add validation in the store
      // this[VALIDATE_FIELD]({ id: this.fieldId })
    },
  },
};
