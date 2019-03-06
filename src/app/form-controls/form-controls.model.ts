
/**
 * Defines what are in a form control.
 */
export interface FormControls {

  /** An error to show underneath form */
  error?: string;

  /** Any class to apply */
  formClass?: string;

  /** Form field hint underneath input field */
  formFieldHint?: string;

  /** The form type */
  formType: FormType;

  /** Label for form field */
  label: string;

  /** Select options */
  options?: SelectOptions[];

  /** Form control name */
  name: string;

  /** The step for input field */
  step?: number;

  /** Tooltip to show */
  tooltip?: string;

  /** The tooltip position */
  tooltipPosition?: string;

  /** Input field type */
  type?: string;
}

/** The form type */
export type FormType = 'checkbox' | 'input' | 'radio' | 'select' | 'toggle';

/**
 * Select menu options.
 */
export interface SelectOptions {
  value: any;
  label: string;
}
