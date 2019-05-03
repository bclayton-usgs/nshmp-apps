import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, ValidatorFn, Validators, FormGroup } from '@angular/forms';

import { ExceedanceExplorer } from '../exceedance-explorer.model';
import { ExceedanceControlPanelService } from './exceedance-control-panel.service';
import { ExceedancePlotService } from '../exceedance-plot/exceedance-plot.service';
import { FormField, FormInput, FormFieldService } from '@nshmp/nshmp-ng-template';

@Component({
  selector: 'app-exceedance-control-panel',
  templateUrl: './exceedance-control-panel.component.html',
  styleUrls: ['./exceedance-control-panel.component.scss']
})
export class ExceedanceControlPanelComponent implements OnInit, OnDestroy, AfterViewInit {

  /** Truncation value change subscription */
  truncationSubscription: Subscription;

  /** Exceedance plot service hasPlot  */
  hasPlotSubscription: Subscription;

  /** Exceedance plot service hasSelected */
  hasSelectedSubscription: Subscription;

  /** Whether there is a current plot */
  hasPlot = false;

  /** Whether a line has been selected on the plot */
  hasSelected = false;

  /** Default form values */
  defaultValues: ExceedanceExplorer = {
    median: 1.0,
    sigma: 0.5,
    rate: 1.0,
    truncation: true,
    truncationLevel: 3
  };

  /** Exceedance form bounds */
  formBounds = {
    median: {
      min: 0,
      max: 10,
      step: 0.5
    },
    sigma: {
      min: 0,
      max: 1,
      step: 0.10
    },
    rate: {
      min: 0,
      max: 1,
      step: 0.10
    },
    truncationLevel: {
      min: 0,
      max: 5,
      step: 1
    }
  };

  /** Exceedance form controls */
  exceedanceFormFields: FormField[];

  /** Exceedance reactive forms */
  exceedanceForm: FormGroup = this.formBuilder.group({
      median: [],
      sigma: [],
      rate: [],
      truncation: [this.defaultValues.truncation],
      truncationLevel: []
    });

  constructor(
      private formBuilder: FormBuilder,
      private controlPanelService: ExceedanceControlPanelService,
      private exceedancePlotService: ExceedancePlotService,
      private formFieldService: FormFieldService) { }

  ngOnInit() {
    this.exceedanceFormFields = this.buildFormFields();

    this.truncationSubscription = this.exceedanceForm.get('truncation').valueChanges
        .subscribe((truncation: boolean) => {
          if (!truncation) {
            this.exceedanceForm.get('truncationLevel').disable();
          } else {
            this.exceedanceForm.get('truncationLevel').enable();
          }
        });

    this.hasPlotSubscription = this.exceedancePlotService.hasPlotObserve()
        .subscribe(hasPlot => this.hasPlot = hasPlot);

    this.hasSelectedSubscription = this.exceedancePlotService.hasSelectedObserve()
        .subscribe(hasSelected => this.hasSelected = hasSelected);

    this.formFieldService.markAllAsTouched(this.exceedanceForm);
  }

  ngAfterViewInit() {
    this.setDefaultValues();
    this.setFormValidators();
  }

  ngOnDestroy() {
    this.truncationSubscription.unsubscribe();
    this.hasPlotSubscription.unsubscribe();
    this.hasSelectedSubscription.unsubscribe();
  }

  /**
   * Returns the form fields of the control panel.
   */
  buildFormFields(): FormField[] {
    const median: FormInput = {
      formFieldError: `[${this.formBounds.median.min}, ${this.formBounds.median.max}]`,
      formClass: 'grid-col-8 margin-bottom-1 form-field-md',
      formControlName: 'median',
      formType: 'input',
      label: 'Median (g)',
      step: this.formBounds.median.step,
      type: 'number'
    };

    const sigma: FormInput = {
      formFieldError: `[${this.formBounds.sigma.min}, ${this.formBounds.sigma.max}]`,
      formClass: 'grid-col-8 margin-bottom-1 form-field-md',
      formControlName: 'sigma',
      formType: 'input',
      label: 'Sigma (natural log units)',
      step: this.formBounds.sigma.step,
      type: 'number'
    };

    const rate: FormInput = {
      formFieldError: `[${this.formBounds.rate.min}, ${this.formBounds.rate.max}]`,
      formClass: 'grid-col-8 margin-bottom-1 form-field-md',
      formControlName: 'rate',
      formType: 'input',
      label: 'Annual Rate',
      step: this.formBounds.rate.step,
      type: 'number'
    };

    const truncation: FormField = {
      formClass: 'grid-col-8 margin-bottom-3',
      formControlName: 'truncation',
      formType: 'toggle',
      label: 'Truncation',
    };

    const truncationLevel: FormInput = {
      formFieldError: `[${this.formBounds.truncationLevel.min}, ${this.formBounds.truncationLevel.max}]`,
      formClass: 'grid-col-8 margin-bottom-1 form-field-md',
      formControlName: 'truncationLevel',
      formType: 'input',
      label: 'Truncation Level (n)',
      step: this.formBounds.truncationLevel.step,
      type: 'number'
    };

    return [median, sigma, rate, truncation, truncationLevel];
  }

  /**
   * Returns the form values.
   */
  getFormValues(): ExceedanceExplorer {
    const values: ExceedanceExplorer = {
      median: +this.exceedanceForm.get('median').value,
      rate: +this.exceedanceForm.get('rate').value,
      sigma: +this.exceedanceForm.get('sigma').value,
      truncation: !!this.exceedanceForm.get('truncation').value,
      truncationLevel: +this.exceedanceForm.get('truncationLevel').value
    };

    return values;
  }

  /**
   * Returns the validators for a form input.
   *
   * @param bounds The min and max bounds for input form
   */
  getNumberValidators(bounds: FormNumberBounds): ValidatorFn[] {
    return [
      Validators.required,
      Validators.min(bounds.min),
      Validators.max(bounds.max)
    ];
  }

  /**
   * Add plot event handler.
   */
  onAddPlot(): void {
    this.controlPanelService.addPlotNext(this.getFormValues());
  }

  /**
   * Remove plot event handler.
   */
  onRemovePlot(): void {
    this.controlPanelService.removePlotNext();
  }

  /**
   * Clear plot event handler.
   */
  onClearPlot(): void {
    this.controlPanelService.clearPlotNext();
  }

  /**
   * Sets all default values.
   */
  setDefaultValues(): void {
    for (const key of Object.keys(this.defaultValues)) {
      this.exceedanceForm.get(key).setValue(this.defaultValues[key]);
    }

  }

  /**
   * Set validators.
   */
  setFormValidators(): void {
    for (const key of Object.keys(this.formBounds)) {
      this.exceedanceForm.get(key).setValidators(this.getNumberValidators(this.formBounds[key]));
    }
  }

}

interface FormNumberBounds {
  min: number;
  max: number;
}
