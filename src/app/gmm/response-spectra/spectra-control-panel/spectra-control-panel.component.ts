import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { SpinnerService } from '@nshmp/nshmp-ng-template';
import { NshmpError, GmmUsage } from '@nshmp/nshmp-web-utils';

import { FormControls } from '../../../form-controls/form-controls.model';
import { GmmMenuService } from '../../gmm-menu/gmm-menu.service';
import { FormSelect } from 'src/app/control-panel-forms/form-select/form-select.model';
import { FormInput } from 'src/app/control-panel-forms/form-input/form-input.model';
import { FormSlider } from 'src/app/control-panel-forms/form-slider/form-slider.model';


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

  spectraFormControls: { [name: string]: FormControls[] };

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
          this.buildFormControls(response as GmmUsage);
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
          rakeSlide: [parameters.rake.value],
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

  buildFormControls(response: GmmUsage) {
    const parameters = response.parameters;

    const multiValueParameters: FormSelect = {
      formClass: 'margin-bttom-1 form-field-md grid-col-12',
      formControlName: 'multiValueParameters',
      formType: 'select',
      label: 'Multi Value Parameter',
      options: [
        {
          label: 'Ground Motion Models',
          value: 'gmm'
        }, {
          label: 'Mw',
          value: 'Mw'
        }, {
          label: 'Vs30',
          value: 'vs30'
        }
      ]
    };

    const Mw: FormInput = {
      formClass: 'margin-bottom-1 form-field-sm grid-col-4',
      formControlName: 'Mw',
      formType: 'input',
      label: 'Mw',
      type: 'number',
      min: parameters.Mw.min,
      max: parameters.Mw.max,
      valueSync: this.spectraForm.get('eventParameters').get('MwSlider'),
    };

    const MwSlider: FormSlider = {
      formClass: 'margin-bottom-1 grid-offset-2 grid-col-6',
      formControlName: 'MwSlider',
      formType: 'slider',
      label: 'Mw Slider',
      min: parameters.Mw.min,
      max: parameters.Mw.max,
      thumbLabel: true,
      valueSync: this.spectraForm.get('eventParameters').get('Mw')
    };

    this.spectraFormControls = {
      multiValueParameters: [multiValueParameters],
      eventParameters: [
        Mw,
        MwSlider
      ]
    };
  }

  onPlot() {
    console.log(this.spectraForm);
  }

}
