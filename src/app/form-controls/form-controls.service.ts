import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class FormControlsService {

  constructor() {}

  /**
   * Loop through all controls and mark as touched.
   *
   * @param formGroup The form group
   */
  markAllAsTouched(formGroup: FormGroup): void {
    for (const control of Object.values(formGroup.controls)) {
      if (control.hasOwnProperty('controls')) {
        this.markAllAsTouched(control as FormGroup);
      } else {
        control.markAsTouched();
      }
    }
  }

}
