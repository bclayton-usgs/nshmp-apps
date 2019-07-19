import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  FormField,
  FormSelect,
  SelectOptions,
  SpinnerService } from '@nshmp/nshmp-ng-template';
import {
  HazardResultsResponse,
  HazardResultsListing,
  HazardResultsDataType,
  HazardResults } from '@nshmp/nshmp-web-utils';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';

import { HazardMapControlPanelService } from './hazard-map-control-panel.service';
import { HazardMapFormValues } from '../hazard-map-form-values.model';

@Component({
  selector: 'app-hazard-map-control-panel',
  templateUrl: './hazard-map-control-panel.component.html',
  styleUrls: ['./hazard-map-control-panel.component.scss']
})
export class HazardMapControlPanelComponent implements OnInit, OnDestroy {
  /* Hazard map form fields */
  hazardMapFormFields: FormField[];

  /* Subscriptions */
  usersMenuSubscription = new Subscription();
  hazardResultsMenuSubscription = new Subscription();
  getCSVSubscription = new Subscription();

  /* Hazard results from nshmp-haz-results Lambda function */
  hazardResponse: HazardResultsResponse;

  /* Hazard map form group */
  hazardMapFormGroup: FormGroup = this.formBuilder.group({
    users: [{value: '', disable: true}, Validators.required],
    hazardResult: [{value: '', disable: true}, Validators.required],
    dataType: [{value: '', disable: true}, Validators.required],
    returnPeriod: [{value: '', disable: true}, Validators.required]
  });

  /* Return periods */
  private readonly SLICE_2P50 = 0.000404;
  private readonly SLICE_5P50 = 0.00103;
  private readonly SLICE_10P50 = 0.0021;

  constructor(
      private controlPanelService: HazardMapControlPanelService,
      private formBuilder: FormBuilder,
      private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.show('Loading');
    this.controlPanelService.getNshmpHazResults().subscribe(response => {
      this.hazardResponse = response;
      this.buildUsersMenu(response);
      this.spinner.remove();
    });

    this.hazardMapFormFields = this.buildFormFields();
  }

  ngOnDestroy() {
    this.usersMenuSubscription.unsubscribe();
    this.hazardResultsMenuSubscription.unsubscribe();
    this.getCSVSubscription.unsubscribe();
  }

  onPlotMap(): void {
    this.getCSVSubscription.unsubscribe();

    const values = this.getFormValues();
    const hazardResults = this.getHazardResults(this.hazardResponse, values.user);
    const hazardResult = this.getHazardResult(hazardResults, values.resultPrefix);
    const listing = this.getHazardListing(hazardResult, values.dataType);
    const s3Path = `https://${hazardResult.bucket}.s3-us-west-2.amazonaws.com/` +
        `${hazardResult.user}/${listing.path}/${listing.file}`;

    this.getCSVSubscription = this.controlPanelService.getCSVFile(s3Path).subscribe(result => {
      const csv = d3.csvParse(result);
      const slices = csv.columns.splice(3, csv.columns.length).map(slice => parseFloat(slice));
      this.buildReturnPeriodMenu(slices);
    });
  }

  private buildDataTypeMenu(hazardResult: HazardResults): void {
    const dataTypeMenu = this.getDataTypeMenu();
    const options = this.buildDataTypeSelectOptions(hazardResult);
    dataTypeMenu.options = options;

    const dataTypeControl = this.hazardMapFormGroup.get('dataType');
    dataTypeControl.enable();
    dataTypeControl.setValue(hazardResult.listings[0].dataType);
  }

  private buildDataTypeSelectOptions(hazardResult: HazardResults): SelectOptions[] {
    const options: SelectOptions[] = [];

    hazardResult.listings.forEach(listing => {
      const dataType = listing.dataType;
      const label = dataType.imt.value === dataType.sourceType.value
          ? dataType.imt.value
          : `${dataType.imt.value}.${dataType.type}.${dataType.sourceType}`;

      options.push({
        label,
        value: listing.dataType
      });
    });

    return options;
  }

  private buildFormFields(): FormField[] {
    const users: FormSelect = {
      formClass: 'grid-col-12',
      formControlName: 'users',
      formType: 'select',
      label: 'Users',
    };

    const result: FormSelect = {
      formClass: 'grid-col-12',
      formControlName: 'hazardResult',
      formType: 'select',
      label: 'Hazard Result',
    };

    const dataType: FormSelect = {
      formClass: 'grid-col-12',
      formControlName: 'dataType',
      formType: 'select',
      label: 'Data Type',
    };

    const returnPeriod: FormSelect = {
      formClass: 'grid-col-12',
      formControlName: 'returnPeriod',
      formType: 'select',
      label: 'Return Period',
    };

    return [ users, result, dataType, returnPeriod ];
  }

  private buildHazardResultMenu(hazardResults: HazardResults[]): void {
    this.hazardResultsMenuSubscription.unsubscribe();

    const resultMenu = this.getHazardResultMenu();
    const options = this.buildHazardResultSelectOptions(hazardResults);
    resultMenu.options = options;

    const resultControl = this.hazardMapFormGroup.get('hazardResult');
    resultControl.enable();
    resultControl.setValue(hazardResults[0].resultPrefix);

    this.buildDataTypeMenu(hazardResults[0]);

    this.hazardResultsMenuSubscription = resultControl.valueChanges.subscribe(resultPrefix => {
      this.buildDataTypeMenu(this.getHazardResult(hazardResults, resultPrefix));
    });
  }

  private buildHazardResultSelectOptions(hazardResults: HazardResults[]): SelectOptions[] {
    const options: SelectOptions[] = [];

    hazardResults.forEach(result => {
      const option: SelectOptions = {
        label: result.resultPrefix,
        value: result.resultPrefix
      };
      options.push(option);
    });

    return options;
  }

  private buildReturnPeriodMenu(slices: number[]): void {
    const menu = this.getReturnPeriodMenu();
    const options = this.buildReturnPeriodSelectOptions(slices);
    menu.options = options;

    const control = this.hazardMapFormGroup.get('returnPeriod');
    control.enable();
    control.setValue(slices[0]);
  }

  private buildReturnPeriodSelectOptions(slices: number[]): SelectOptions[] {
    const options: SelectOptions[] = [];

    slices.forEach(slice => {
      let label = '';
      const years = (1 / slice).toFixed(0);
      switch (slice) {
        case this.SLICE_2P50:
          label = `${years} years (2% in 50 years)`;
          break;
        case this.SLICE_5P50:
          label = `${years} years (5% in 50 years)`;
          break;
        case this.SLICE_10P50:
          label = `${years} years (10% in 50 years)`;
          break;
        default:
          label = `${years} years`;
      }

      options.push({
        label,
        value: slice
      });
    });

    return options;
  }

  private buildUsersMenu(response: HazardResultsResponse) {
    this.usersMenuSubscription.unsubscribe();

    const usersMenu = this.getUsersMenu();
    const options = this.buildUsersSelectOptions(response);
    usersMenu.options = options;

    const usersControl = this.hazardMapFormGroup.get('users');
    usersControl.enable();
    const initialUser = response.result.users[0];
    usersControl.setValue(initialUser);
    this.buildHazardResultMenu(this.getHazardResults(response, initialUser));

    this.usersMenuSubscription = usersControl.valueChanges.subscribe(user => {
      this.buildHazardResultMenu(this.getHazardResults(response, user));
    });
  }

  private buildUsersSelectOptions(response: HazardResultsResponse): SelectOptions[] {
    const options: SelectOptions[] = [];

    response.result.users.forEach(user => {
      options.push({
        label: user,
        value: user
      });
    });

    return options;
  }

  private getHazardResult(hazardResults: HazardResults[], resultPrefix: string): HazardResults {
    return hazardResults.find(hazardResult => hazardResult.resultPrefix === resultPrefix);
  }

  private getHazardResults(response: HazardResultsResponse, user: string): HazardResults[] {
    return response.result.hazardResults
        .filter(listing => listing.user === user);
  }

  private getReturnPeriodMenu(): FormSelect {
    return this.getMenu('returnPeriod');
  }

  private getDataTypeMenu(): FormSelect {
    return this.getMenu('dataType');
  }

  private getFormValues(): HazardMapFormValues {
    const values: HazardMapFormValues = {
      user: this.hazardMapFormGroup.get('users').value as string,
      dataType: this.hazardMapFormGroup.get('dataType').value as HazardResultsDataType,
      resultPrefix: this.hazardMapFormGroup.get('hazardResult').value as string
    };

    return values;
  }

  private getHazardListing(
      hazardResult: HazardResults,
      dataType: HazardResultsDataType): HazardResultsListing {
    return hazardResult.listings.find(listing => listing.dataType === dataType);
  }

  private getHazardResultMenu(): FormSelect {
    return this.getMenu('hazardResult');
  }

  private getMenu(name: string): FormField {
    return this.hazardMapFormFields.find(form => {
      return form.formControlName === name;
    });
  }

  private getUsersMenu(): FormSelect {
    return this.getMenu('users');
  }

}
