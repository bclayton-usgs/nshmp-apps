import { Injectable } from '@angular/core';
import { HazardResultsResponse } from '@nshmp/nshmp-web-utils';
import { Subject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as AWS from 'aws-sdk';
import * as d3 from 'd3';

import { HazardMapFormValues } from '../hazard-map-form-values.model';

/**
 * Hazard map plot control panel service.
 */
@Injectable({ providedIn: 'root' })
export class HazardMapControlPanelService {

  private constructor() {}

  private plotMapEmitter = new Subject<HazardMapFormValues>();

  private readonly S3 = new AWS.S3(AWS.config);

  private readonly HAZ_RESULTS_BUCKET = 'nshmp-haz-lambda';
  private readonly HAZ_RESULTS_KEY = 'nshmp-haz-aws-results-metadata.json';

  /**
   * Get a CSV file from S3.
   *
   * @param request The S3 request
   */
  getCSVFile(request: AWS.S3.GetObjectRequest): Observable<d3.DSVRowArray<string>> {
    return this.getS3Object(request).pipe(map(body => {
      return d3.csvParse(body.toString());
    }));
  }

  /**
   * Returns the nshmp-haz results in S3.
   */
  getNshmpHazResults(): Observable<HazardResultsResponse> {
    const request: AWS.S3.GetObjectRequest = {
      Bucket: this.HAZ_RESULTS_BUCKET,
      Key: this.HAZ_RESULTS_KEY
    };

    return this.getS3Object(request).pipe(map(body => {
      return JSON.parse(body.toString()) as HazardResultsResponse;
    }));
  }

  /**
   * Returns the plot map observer for when the plot map button
   * is clicked.
   */
  plotMapObserve(): Observable<HazardMapFormValues> {
    return this.plotMapEmitter.asObservable();
  }

  /**
   * Sends the form values to the observers.
   *
   * @param formValues The form values
   */
  plotMapNext(formValues: HazardMapFormValues): void {
    this.plotMapEmitter.next(formValues);
  }

  private getS3Object(request: AWS.S3.GetObjectRequest): Observable<AWS.S3.Body> {
    const promise = this.S3.getObject(request).promise();
    return from(promise).pipe(map(result => result.Body));
  }

}
