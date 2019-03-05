import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';

import { FormControls } from '../../form-controls/form-controls.model';
import { ExceedanceExplorer } from '../exceedance-explorer.model';
import { ExceedanceControlPanelService } from './exceedance-control-panel.service';
import { ExceedancePlotService } from '../exceedance-plot/exceedance-plot.service';

@Component({
  selector: 'app-exceedance-control-panel',
  templateUrl: './exceedance-control-panel.component.html',
  styleUrls: ['./exceedance-control-panel.component.scss']
})
export class ExceedanceControlPanelComponent implements OnInit, OnDestroy {

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
  exceedanceFormControls: FormControls[] = [
    {
      formClass: 'grid-col-8',
      formType: 'input',
      label: 'Median (g):',
      name: 'median',
      step: this.formBounds.median.step,
      tooltip: `[${this.formBounds.median.min}, ${this.formBounds.median.max}]`,
      type: 'number'
    }, {
      formClass: 'grid-col-8',
      formType: 'input',
      label: 'Sigma (natural log units):',
      name: 'sigma',
      step: this.formBounds.sigma.step,
      tooltip: `[${this.formBounds.sigma.min}, ${this.formBounds.sigma.max}]`,
      type: 'number'
    }, {
      formClass: 'grid-col-8',
      formType: 'input',
      label: 'Annual Rate:',
      name: 'rate',
      step: this.formBounds.rate.step,
      tooltip: `[${this.formBounds.rate.min}, ${this.formBounds.rate.max}]`,
      type: 'number'
    }, {
      formClass: 'grid-col-8',
      formType: 'toggle',
      label: 'Truncation',
      name: 'truncation'
    }, {
      formClass: 'grid-col-8',
      formType: 'input',
      label: 'Truncation Level (n)',
      name: 'truncationLevel',
      step: this.formBounds.truncationLevel.step,
      tooltip: `[${this.formBounds.truncationLevel.min}, ${this.formBounds.truncationLevel.max}]`,
      type: 'number'
    }
  ];

  /** Exceedance reactive forms */
  exceedanceForm = this.formBuild.group({
    median: [
      this.defaultValues.median,
      this.getNumberValidators(this.formBounds.median)
    ],
    sigma: [
      this.defaultValues.sigma,
      this.getNumberValidators(this.formBounds.sigma)
    ],
    rate: [
      this.defaultValues.rate,
      this.getNumberValidators(this.formBounds.rate)
    ],
    truncation: [this.defaultValues.truncation],
    truncationLevel: [
      this.defaultValues.truncationLevel,
      this.getNumberValidators(this.formBounds.truncationLevel)
    ]
  });

  constructor(
      private formBuild: FormBuilder,
      private controlPanelService: ExceedanceControlPanelService,
      private exceedancePlotService: ExceedancePlotService) { }

  ngOnInit() {
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
  }

  ngOnDestroy() {
    this.truncationSubscription.unsubscribe();
    this.hasPlotSubscription.unsubscribe();
    this.hasSelectedSubscription.unsubscribe();
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

}

interface FormNumberBounds {
  min: number;
  max: number;
}
