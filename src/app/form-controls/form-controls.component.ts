import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormControls } from './form-controls.model';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss']
})
export class FormControlsComponent implements OnInit {

  /** Array of form controls */
  @Input() formControls: FormControls[];

  /** The form group */
  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
