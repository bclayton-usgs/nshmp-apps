import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {
  FormSelect,
  SelectOptions,
  SpinnerService,
  FormFieldService } from '@nshmp/nshmp-ng-template';
import { CheckJobsResult } from '@nshmp/nshmp-haz-lambda-trigger';
import { NshmpError } from '@nshmp/nshmp-web-utils';
import { Subscription } from 'rxjs';

import { AwsJobsFormValues } from '../aws-jobs-form-values';
import { AwsJobsControlPanelService } from './aws-jobs-control-panel.service';

@Component({
  selector: 'app-aws-jobs-control-panel',
  templateUrl: './aws-jobs-control-panel.component.html',
  styleUrls: ['./aws-jobs-control-panel.component.scss']
})
export class AwsJobsControlPanelComponent implements OnInit, OnDestroy {

  jobs: CheckJobsResult;

  jobsSubscription = new Subscription();
  queryParamsSubscription = new Subscription();

  awsFormFields: FormSelect[] = [
    {
      formClass: 'grid-col-12',
      formControlName: 'users',
      formType: 'select',
      label: 'Users'
    }
  ];

  awsFormGroup: FormGroup = this.formBuilder.group({
    users: [Validators.required, Validators.minLength(2)]
  });

  private readonly USER = 'user';

  constructor(
      private formBuilder: FormBuilder,
      private controlPanelService: AwsJobsControlPanelService,
      private spinner: SpinnerService,
      private formService: FormFieldService,
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {
    this.spinner.show('Loading ...');
    this.jobsSubscription = this.controlPanelService.getJobs()
        .subscribe(jobs => this.onGetJobs(jobs),
        err => NshmpError.throwError(err));

  }

  ngOnDestroy() {
    this.jobsSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }

  onShowJobs() {
    const values = this.getFormValues();
    const userJobs = this.jobs.results.filter(job => job.user === values.user);
    this.controlPanelService.jobsNext(userJobs.shift().jobs);
    this.updateQueryParameters();
  }

  private buildUsersMenu(jobs: CheckJobsResult): void {
    const menu = this.getUsersMenu();
    const control = this.getUsersControl();
    const options = this.buildUsersSelectOptions(jobs);
    menu.options = options;
    control.setValue(options.slice(0).shift().value);
  }

  private buildUsersSelectOptions(jobs: CheckJobsResult): SelectOptions[] {
    const options: SelectOptions[] = [];

    jobs.results.forEach(job => {
      options.push({
        label: job.user,
        value: job.user
      });
    });

    return options;
  }

  private checkQueryParameters(params: AwsJobsFormValues): void {
    if (this.USER in params) {
      this.setFormValue(this.getUsersControl(), this.getUsersMenu(), params.user);
      if (this.awsFormGroup.valid) {
        this.onShowJobs();
      }
    }
  }

  private getFormValues(): AwsJobsFormValues {
    return {
      user: this.getUsersControl().value as string
    };
  }

  private getUsersControl(): AbstractControl {
    return this.awsFormGroup.get('users');
  }

  private getUsersMenu(): FormSelect {
    return this.awsFormFields.find(form => form.formControlName === 'users');
  }

  private onGetJobs(jobs: CheckJobsResult) {
    this.jobs = jobs;
    this.buildUsersMenu(jobs);
    this.spinner.remove();
    this.formService.markAllAsTouched(this.awsFormGroup);

    this.queryParamsSubscription = this.route.queryParams
        .subscribe((params: AwsJobsFormValues) => this.checkQueryParameters(params));
  }

  private setFormValue(control: AbstractControl, selectMenu: FormSelect, value: any): void {
    const option = selectMenu.options.find(opt => opt.value === value);
    if (option === undefined) {
      NshmpError.throwError(`Value [${value}] not supported for [${selectMenu.label}]`);
    }

    control.setValue(value);
  }

  private updateQueryParameters(): void {
    this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParams: this.getFormValues()});
  }

}
