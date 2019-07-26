import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { CheckJobsResult, CheckJobsResponseData, CheckJobsRunningJob } from '@nshmp/nshmp-haz-lambda-trigger';
import { map } from 'rxjs/operators';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class AwsJobsControlPanelService {

  private jobsEmitter = new Subject<CheckJobsRunningJob[]>();
  private readonly LAMBDA =  new AWS.Lambda(AWS.config);

  getJobs(): Observable<CheckJobsResult>{
    const promise = this.LAMBDA.invoke({
      FunctionName: 'nshmp-haz-check-jobs'
    }).promise();

    return from(promise)
        .pipe(map(result => JSON.parse(result.Payload.toString()) as CheckJobsResult));
  }

  jobsObserve(): Observable<CheckJobsRunningJob[]> {
    return this.jobsEmitter.asObservable();
  }

  jobsNext(jobs: CheckJobsRunningJob[]): void {
    this.jobsEmitter.next(jobs);
  }

}
