import { Component, OnInit } from '@angular/core';
import { FormField, FormInput, FormFieldService } from '@nshmp/nshmp-ng-template';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HazardMapControlPanelService } from './hazard-map-control-panel.service';
import { HazardMap } from '../hazard-map.model';

@Component({
  selector: 'app-hazard-map-control-panel',
  templateUrl: './hazard-map-control-panel.component.html',
  styleUrls: ['./hazard-map-control-panel.component.sass']
})
export class HazardMapControlPanelComponent implements OnInit {

  /* Hazard map form fields */
  hazardMapFormFields: FormField[];

  /* Hazard map form group */
  hazardMapFormGroup: FormGroup = this.formBuilder.group({
    s3Bucket: ['', Validators.required],
    s3File: ['', Validators.required]
  });

  constructor(
      private formBuilder: FormBuilder,
      private controlPanelService: HazardMapControlPanelService) { }

  ngOnInit() {
    this.hazardMapFormFields = this.buildFormFields();
  }

  buildFormFields(): FormField[] {
    const s3Bucket: FormInput = {
      formClass: 'grid-col-12 margin-bottom-1 form-field-md',
      formControlName: 's3Bucket',
      formType: 'input',
      label: 'Hazard Output S3 Bucket',
      type: 'text'
    };

    const s3File: FormInput = {
      formClass: 'grid-col-12 margin-bottom-1 form-field-md',
      formControlName: 's3Bucket',
      formType: 'input',
      label: 'Hazard Output S3 Path and Zip File Name',
      type: 'text'
    };


    return [s3Bucket, s3File];
  }

  getFormValues(): HazardMap {
    const values: HazardMap = {
      s3Bucket: this.hazardMapFormGroup.get('s3Bucket').value as string,
      s3File: this.hazardMapFormGroup.get('s3File').value as string
    };

    return values;
  }

  onPlotMap(): void {
    this.controlPanelService.plotMapNext(this.getFormValues());
  }

}
