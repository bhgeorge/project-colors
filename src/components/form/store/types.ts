import { Dictionary } from '@/utils/interfaces/interface.dictionary';

export interface PrereqStructure {
  type: string;
  readonly fieldId: string;
  eval: {
    method: string;
    match: string;
  };
}

export interface ValidationFunc {
  (val: string | boolean | number): boolean;
}

export interface FieldStructure {
  readonly component: string;
  readonly id: string;
  computeValue?: boolean;
  label: string;
  name: string;
  value?: string | boolean | number;
  prereqs?: Array<PrereqStructure>;
  required?: boolean;
  validation?: Array<ValidationFunc>;
}

export interface FieldUpdate {
  readonly id: string;
  readonly val: string | boolean | number;
}

export interface GroupStructure {
  fields: Array<FieldStructure>;
  name: string;
}

export interface FormStructure {
  readonly id: string;
  fields?: Array<FieldStructure>;
  groups?: Array<GroupStructure>;
  onSubmit: ValidationFunc;
  submitText?: string;
}

export interface FormReferences {
  readonly id: string;
  fields: Array<string>;
}

export interface VuexFormState {
  forms: Dictionary<FormReferences>;
  fields: Dictionary<FieldStructure>;
}
