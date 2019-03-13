import { AbstractControl } from '@angular/forms';

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

  /** Select opt group */
  optGroups?: SelectOptGroup[];

  /** Minimum value */
  min?: number;

  /** Maximum value */
  max?: number;

  /** Multiple select */
  multiple?: boolean;

  /** Form control name */
  formControlName: string;

  /** The step for input field */
  step?: number;

  /** Tooltip to show */
  tooltip?: string;

  /** The tooltip position */
  tooltipPosition?: string;

  /** Input field type */
  type?: string;

  /** Thumb label for slider */
  thumbLabel?: boolean;

  /** Form control to sync value to */
  valueSync?: AbstractControl;
}

/** The form type */
export type FormType = 'button-toggle' | 'checkbox' | 'input' | 'select' | 'slider' | 'toggle';

/**
 * Select menu options.
 */
export interface SelectOptions {
  value: any;
  label: string;
}

/**
 * Select opt groups
 */
export interface SelectOptGroup {
  options: SelectOptions[];
  label: string;
}
