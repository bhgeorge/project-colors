import {
  ADD_FORM,
  SET_FIELD_VAL,
} from './mutation-types';
import {
  VuexFormState,
  FormStructure,
  FieldUpdate,
} from './types';

export default {
  [ADD_FORM](state: VuexFormState, formStructure: FormStructure) {
    // Loop all the fields to grab their ID for storage,
    // then store them in the fields Dictionary
    const fieldIds: Array<string> = [];
    if (formStructure.groups) {
      formStructure.groups.forEach((group) => {
        group.fields.forEach((field) => {
          fieldIds.push(field.id);
          state.fields[field.id] = field;
        });
      });
    }

    if (formStructure.fields) {
      formStructure.fields.forEach((field) => {
        fieldIds.push(field.id);
        state.fields[field.id] = field;
      });
    }
    // Add the form with field ID references
    state.forms[formStructure.id] = {
      id: formStructure.id,
      fields: fieldIds,
    };
  },

  [SET_FIELD_VAL](state: VuexFormState, fieldUpdate: FieldUpdate) {
    state.fields[fieldUpdate.id].value = fieldUpdate.val;
  },
};
