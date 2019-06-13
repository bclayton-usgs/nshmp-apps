import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormField, FormInput, FormSelect, SelectOptions } from '@nshmp/nshmp-ng-template';
import { Subscription } from 'rxjs';

import { HazardMapControlPanelService } from './hazard-map-control-panel.service';
import { HazardMapFormValues } from '../hazard-map-form-values.model';
import { HazardMapPlotService } from '../hazard-map-plot/hazard-map-plot.service';
import { HazardMapPlotResult } from '../hazard-map-results/hazard-map-plot-result.model';

@Component({
  selector: 'app-hazard-map-control-panel',
  templateUrl: './hazard-map-control-panel.component.html',
  styleUrls: ['./hazard-map-control-panel.component.scss']
})
export class HazardMapControlPanelComponent implements OnInit, OnDestroy {

  /* Subscription for when data type is changed */
  dataTypeSubscription: Subscription;

  /* Hazard map form fields */
  hazardMapFormFields: FormField[];

  /* Subscription for when iml is changed */
  imlSubscription: Subscription;

  /* Subscription for when plot map is clicked */
  mapPlotSubscription: Subscription;

  /* Hazard map form group */
  hazardMapFormGroup: FormGroup = this.formBuilder.group({
    zipFile: ['', Validators.required],
    dataType: [{ value: '', disabled: true }],
    iml: [{value: '', disabled: true}]
  });

  constructor(
      private controlPanelService: HazardMapControlPanelService,
      private formBuilder: FormBuilder,
      private mapPlotService: HazardMapPlotService) { }

  ngOnInit() {
    this.hazardMapFormFields = this.buildFormFields();

    this.mapPlotSubscription = this.mapPlotService.mapResultsObserve()
        .subscribe(dataTypes => this.buildDataTypeMenu(dataTypes));
  }

  ngOnDestroy() {
    this.dataTypeSubscription.unsubscribe();
    this.imlSubscription.unsubscribe();
    this.mapPlotSubscription.unsubscribe();
  }

  buildDataTypeMenu(results: HazardMapPlotResult[]): void {
    if (this.dataTypeSubscription) {
      this.dataTypeSubscription.unsubscribe();
    }

    const dataTypeMenu = this.getDataTypeMenu();
    const options = this.buildDataTypeOptions(results);
    dataTypeMenu.options  = options;
    const intialDataType = options[0];

    const dataTypeControl = this.hazardMapFormGroup.get('dataType');
    dataTypeControl.setValue(intialDataType.value);
    dataTypeControl.enable();

    const intitalResult = results.find(res => {
      return res.value === intialDataType.value;
    });

    this.buildImlMenu(intitalResult);

    this.dataTypeSubscription = this.hazardMapFormGroup.get('dataType')
        .valueChanges.subscribe((value: string) => {
          const result = results.find(res => {
            return res.value === value;
          });
          this.onDataTypeChange(result);
        });
  }

  buildDataTypeOptions(results: HazardMapPlotResult[]): SelectOptions[] {
    const options: SelectOptions[] = [];

    results.forEach(result => {
      const option: SelectOptions = {
        label: result.display,
        value: result.value
      };
      options.push(option);
    });

    return options;
  }

  buildFormFields(): FormField[] {
    const zipFile: FormInput = {
      formClass: 'grid-col-12 margin-top-1 form-field-md',
      formControlName: 'zipFile',
      formType: 'input',
      label: 'Hazard Output Zip File URL',
      type: 'text'
    };

    const dataType: FormSelect = {
      formClass: 'grid-col-12 form-field-md',
      formControlName: 'dataType',
      formType: 'select',
      label: 'Data Type',
    };

    const iml: FormSelect = {
      formClass: 'grid-col-12 form-field-md',
      formControlName: 'iml',
      formType: 'select',
      label: 'Intensity Measure Level',
    };

    return [ zipFile, dataType, iml ];
  }

  buildImlMenu(result: HazardMapPlotResult): void {
    if (this.imlSubscription) {
      this.imlSubscription.unsubscribe();
    }

    const imlMenu = this.getImlMenu();
    const options = this.buildImlOptions(result);
    imlMenu.options = options;
    const intialIml = options[0];

    const imlControl = this.hazardMapFormGroup.get('iml');
    result.setIml(intialIml.value);
    imlControl.setValue(intialIml.value);
    imlControl.enable();

    this.imlSubscription = imlControl.valueChanges.subscribe((iml) => {
      this.onImlChange(result, iml);
    });
  }

  buildImlOptions(result: HazardMapPlotResult): SelectOptions[] {
    const options: SelectOptions[] = result.imls.map(iml => {
      const option: SelectOptions = {
        label: String(iml),
        value: iml
      };
      return option;
    });

    return options;
  }

  getDataTypeMenu(): FormSelect {
    return this.hazardMapFormFields.find(form => {
      return form.formControlName === 'dataType';
    });
  }

  getFormValues(): HazardMapFormValues {
    const values: HazardMapFormValues = {
      zipFile: this.hazardMapFormGroup.get('zipFile').value as string
    };

    return values;
  }

  getImlMenu(): FormSelect {
    return this.hazardMapFormFields.find(form => {
      return form.formControlName === 'iml';
    });
  }

  onDataTypeChange(result: HazardMapPlotResult): void {
    this.buildImlMenu(result);
    this.controlPanelService.dataTypeNext(result);
  }

  onImlChange(result: HazardMapPlotResult, iml: number): void {
    result.setIml(iml);
    this.controlPanelService.dataTypeNext(result);
  }

  onPlotMap(): void {
    if (this.dataTypeSubscription) {
      this.dataTypeSubscription.unsubscribe();
    }

    if (this.imlSubscription) {
      this.imlSubscription.unsubscribe();
    }

    const dataTypeMenu = this.getDataTypeMenu();
    dataTypeMenu.options = [];
    this.hazardMapFormGroup.get('dataType').disable();

    const imlMenu = this.getImlMenu();
    imlMenu.options = [];
    this.hazardMapFormGroup.get('iml').disable();

    this.controlPanelService.plotMapNext(this.getFormValues());
  }

}
