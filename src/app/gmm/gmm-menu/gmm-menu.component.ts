import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GmmUsageParameters } from '@nshmp/nshmp-web-utils';
import { Subscription } from 'rxjs';

import { GmmMenuService } from './gmm-menu.service';
import { FormField, SelectOptGroup, SelectOptions } from '@nshmp/nshmp-ng-template';

@Component({
  selector: 'app-gmm-menu',
  templateUrl: './gmm-menu.component.html',
  styleUrls: ['./gmm-menu.component.scss']
})
export class GmmMenuComponent implements OnInit {

  /** The form group */
  @Input() formGroup: FormGroup;

  /** Whether the GMMs are sourted by group or alphabetized */
  @Input() isGmmGrouped: boolean;

  gmmFormControl: FormField = {
    formClass: 'form-field-md grid-col-12',
    formControlName: 'gmm',
    formType: 'select',
    label: 'Ground Motion Models',
  };

  gmmSubscription: Subscription;

  gmmGrouped: SelectOptGroup[];

  gmmAlpha: SelectOptions[];

  constructor(private gmmMenuService: GmmMenuService) { }

  ngOnInit() {
    this.gmmSubscription = this.gmmMenuService.gmmParametersObserve()
        .subscribe(parameters => {
          this.gmmGrouped = this.groupGmms(parameters);
          this.gmmAlpha = this.alphabetizeGmms(parameters);
        });
  }

  alphabetizeGmms(parameters: GmmUsageParameters): SelectOptions[] {
    return parameters.gmm.values.map((gmm) => {
      return {
        label: gmm.label,
        value: gmm.id
      };
    });
  }

  groupGmms(parameters: GmmUsageParameters): SelectOptGroup[] {
    const gmmGroupOptions = parameters.group.values.map((group) => {
      const options = parameters.gmm.values.filter((gmm) => {
        return group.data.includes(gmm.id);
      }).map((value) => {
        return {
          label: value.label,
          value: value.id
        };
      });

      return {
        label: group.label,
        options
      };
    });

    return gmmGroupOptions;
  }

}
