import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { CheckJobsRunningJob } from '@nshmp/nshmp-haz-lambda-trigger';
import { NshmpError } from '@nshmp/nshmp-web-utils';
import { Subscription, Observable } from 'rxjs';

import { AwsJobsControlPanelService } from '../aws-jobs-control-panel/aws-jobs-control-panel.service';

interface KeyValue {
  key: string;
  value: any;
}

@Component({
  selector: 'app-aws-jobs-main-content',
  templateUrl: './aws-jobs-main-content.component.html',
  styleUrls: ['./aws-jobs-main-content.component.scss']
})
export class AwsJobsMainContentComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  jobs: CheckJobsRunningJob[];

  jobsSubscription = new Subscription();
  jobsObserve: Observable<CheckJobsRunningJob[]>;

  ObjectKeys = Object.keys;

  readonly displayedColumns = ['key', 'value'];

  constructor(
      private controlPanelService: AwsJobsControlPanelService) { }

  ngOnInit() {
    this.jobsObserve = this.controlPanelService.jobsObserve();

    this.jobsSubscription = this.jobsObserve
        .subscribe(jobs => this.onShowJobs(jobs),
        err => NshmpError.throwError(err));
  }

  ngOnDestroy() {
    this.jobsSubscription.unsubscribe();
  }

  toDataSource(job: CheckJobsRunningJob): MatTableDataSource<KeyValue> {
    const values: KeyValue[] = [];

    Object.keys(job).forEach(key => {
      values.push({
        key: this.camelToReadable(key),
        value: job[key]
      });
    });

    const dataSource = new MatTableDataSource(values);
    dataSource.sort = this.sort;
    return dataSource;
  }

  private camelToReadable(name: string): string {
    return name
    .replace(/([A-Z])/g, ' $1') // insert a space before all caps
    .replace(/^./, (str) => str.toUpperCase()); // uppercase the first character
  }

  private onShowJobs(jobs: CheckJobsRunningJob[]) {
    this.jobs = jobs;
  }

}
