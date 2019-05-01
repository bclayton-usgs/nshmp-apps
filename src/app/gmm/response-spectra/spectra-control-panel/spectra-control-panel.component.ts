import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { SpinnerService, FormInput, FormSlider, FormButtonToggle, FormField } from '@nshmp/nshmp-ng-template';
import { NshmpError, GmmUsage } from '@nshmp/nshmp-web-utils';

import { FormControls } from '../../../form-controls/form-controls.model';
import { GmmMenuService } from '../../gmm-menu/gmm-menu.service';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';


@Component({
  selector: 'app-spectra-control-panel',
  templateUrl: './spectra-control-panel.component.html',
  styleUrls: ['./spectra-control-panel.component.scss']
})
export class SpectraControlPanelComponent implements OnInit, OnDestroy {

  isGmmGrouped = true;

  spectraUrl = 'https://dev01-earthquake.cr.usgs.gov/nshmp-haz-ws/gmm/spectra';

  parameterSubscription: Subscription;
  parameterObservable: Observable<object>;

  spectraFormControls: { [name: string]: FormField[] };

  spectraForm: FormGroup;

  constructor(
      private formBuild: FormBuilder,
      private spinnerService: SpinnerService,
      private http: HttpClient,
      private gmmMenuService: GmmMenuService) {
  }

  ngOnInit() {
    this.parameterObservable = this.http.get(this.spectraUrl);

    this.parameterSubscription = this.parameterObservable.subscribe(response => {
          this.buildForm(response as GmmUsage);
          this.buildFormFields(response as GmmUsage);
        }, error => {
          NshmpError.throwError(error.message);
        });

  }

  ngOnDestroy() {
    this.parameterSubscription.unsubscribe();
  }

  buildForm(response: GmmUsage) {
    const parameters = response.parameters;
    this.gmmMenuService.gmmParametersNext(parameters);

    this.spectraForm = this.formBuild.group({
        multiValueParameters: ['gmm', Validators.required],
        gmm: ['', Validators.required],
        eventParameters: this.formBuild.group({
          Mw: [parameters.Mw.value],
          MwSlider: [parameters.Mw.value],
          MwButtons: [],
          rake: [parameters.rake.value],
          rakeSlider: [parameters.rake.value],
          rakeButtons: [],
          zHyp: [parameters.zHyp.value],
          centerDownDip: []
        }),
        sourceParameters: this.formBuild.group({
          zTop: [parameters.zTop.value],
          zTopSlider: [parameters.zTop.value],
          dip: [parameters.dip.value],
          dipSlider: [parameters.dip.value],
          width: [parameters.width.value],
          widthSlider: [parameters.width.value]
        }),
        pathParameters: this.formBuild.group({
          rX: [parameters.rX.value],
          rXSlider: [parameters.rX.value],
          rRup: [parameters.rRup.value],
          rJB: [parameters.rJB.value],
          deriveRJB: [],
          hangingWallFootWall: []
        }),
        siteBasinParameters: this.formBuild.group({
          vs30: [parameters.vs30.value],
          vs30Slider: [parameters.vs30.value],
          vs30Buttons: [],
          z1p0: [parameters.z1p0.value],
          z2p5: [parameters.z1p0.value]
        })
      });
  }

  buildFormFields(response: GmmUsage) {

    const eventFormFields = this.eventFormFields(response);


    this.spectraFormControls = {
      eventFormFields
    };
  }

  eventFormFields(response: GmmUsage): FormField[] {
    const parameters = response.parameters;

    const Mw: FormInput = {
      formClass: 'grid-col-6 form-field-xs',
      formControlName: 'Mw',
      formType: 'input',
      label: 'Mw',
      min: parameters.Mw.min,
      max: parameters.Mw.max,
      type: 'number',
      valueSync: this.spectraForm.get('eventParameters').get('MwSlider')
    };

    const MwSlider: FormSlider = {
      formClass: 'grid-offset-1 grid-col-5 form-field-xs',
      formControlName: 'MwSlider',
      formType: 'slider',
      label: '',
      min: parameters.Mw.min,
      max: parameters.Mw.max,
      sliderClass: 'grid-col-12',
      thumbLabel: true,
      valueSync: this.spectraForm.get('eventParameters').get('Mw')
    };

    const MwButtons: FormButtonToggle = {
      buttons: [
        {label: '4.0', value: 4.0},
        {label: '4.5', value: 4.5},
        {label: '5.0', value: 5.0},
        {label: '5.5', value: 5.5},
        {label: '6.0', value: 6.0},
        {label: '6.5', value: 6.5},
        {label: '7.0', value: 7.0},
        {label: '7.5', value: 7.5},
        {label: '8.0', value: 8.0},
        {label: '8.5', value: 8.5},
      ],
      formClass: 'grid-col-12',
      formControlName: 'MwButtons',
      formType: 'button-toggle',
      label: '',
    };

    const rake: FormInput = {
      formClass: 'margin-top-4 grid-col-6 form-field-xs',
      formControlName: 'rake',
      formType: 'input',
      label: 'Rake',
      min: parameters.rake.min,
      max: parameters.rake.max,
      suffix: '°',
      type: 'number',
      valueSync: this.spectraForm.get('eventParameters').get('rakeSlider')
    };

    const rakeSlider: FormSlider = {
      formClass: 'grid-offset-1 grid-col-5 form-field-xs',
      formControlName: 'rakeSlider',
      formType: 'slider',
      label: '',
      min: parameters.rake.min,
      max: parameters.rake.max,
      sliderClass: 'grid-col-12',
      thumbLabel: true,
      valueSync: this.spectraForm.get('eventParameters').get('rake')
    };

    const rakeButtons: FormButtonToggle = {
      buttons: [
        {label: 'Strike-Slip', value: 0},
        {label: 'Normal', value: -90},
        {label: 'Reverse', value: 90},
      ],
      formClass: 'grid-col-12',
      formControlName: 'rakeButtons',
      formType: 'button-toggle',
      label: '',
    };

    return [Mw, MwSlider, MwButtons, rake, rakeSlider, rakeButtons];
  }

  sourceParametersFormFields(response: GmmUsage): FormField[] {
    const parameters = response.parameters;

    return null;
  }

  pathParametersFormFields() {

  }

  siteBasinFormFields() {

  }

  onPlot() {
  }

}
