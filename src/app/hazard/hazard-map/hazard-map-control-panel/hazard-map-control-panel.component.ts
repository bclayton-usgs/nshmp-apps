import { Component, OnInit } from '@angular/core';
import { FormField, FormInput, FormFieldService } from '@nshmp/nshmp-ng-template';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HazardMapControlPanelService } from './hazard-map-control-panel.service';
import { HazardMap } from '../hazard-map.model';

@Component({
  selector: 'app-hazard-map-control-panel',
  templateUrl: './hazard-map-control-panel.component.html',
  styleUrls: ['./hazard-map-control-panel.component.scss']
})
export class HazardMapControlPanelComponent implements OnInit {

  /* Hazard map form fields */
  hazardMapFormFields: FormField[];

  /* Hazard map form group */
  hazardMapFormGroup: FormGroup = this.formBuilder.group({
    zipFile: ['', Validators.required],
  });

  constructor(
      private formBuilder: FormBuilder,
      private controlPanelService: HazardMapControlPanelService) { }

  ngOnInit() {
    this.hazardMapFormFields = this.buildFormFields();
  }

  buildFormFields(): FormField[] {
    const zipFile: FormInput = {
      formClass: 'grid-col-12 margin-bottom-1 form-field-md',
      formControlName: 'zipFile',
      formType: 'input',
      label: 'Hazard Output S3 Bucket',
      type: 'text'
    };

    return [zipFile];
  }

  getFormValues(): HazardMap {
    const values: HazardMap = {
      zipFile: this.hazardMapFormGroup.get('zipFile').value as string
    };

    return values;
  }

  onPlotMap(): void {
    this.controlPanelService.plotMapNext(this.getFormValues());
  }

}
