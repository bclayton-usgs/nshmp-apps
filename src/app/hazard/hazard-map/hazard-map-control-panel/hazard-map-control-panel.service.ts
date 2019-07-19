import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HazardResultsResponse } from '@nshmp/nshmp-web-utils';

import { HazardMapFormValues } from '../hazard-map-form-values.model';
import { HazardMapPlotResult } from '../hazard-map-results/hazard-map-plot-result.model';

/**
 * Hazard map plot control panel service.
 */
@Injectable({ providedIn: 'root' })
export class HazardMapControlPanelService {

  private constructor(private http: HttpClient) {}

  private readonly AWS_URL = 'https://kqyga0ebwe.execute-api.us-west-2.amazonaws.com/nshmp/nshmp-haz-results';

  private plotMapEmitter = new Subject<HazardMapFormValues>();
  private dataTypeEmitter = new Subject<HazardMapPlotResult>();

  /**
   * Returns the data type observable for when the data type select
   * menu changes.
   */
  dataTypeObserve(): Observable<HazardMapPlotResult> {
    return this.dataTypeEmitter.asObservable();
  }

  /**
   * Send the result to the observers.
   *
   * @param result The hazard result
   */
  dataTypeNext(result: HazardMapPlotResult): void {
    this.dataTypeEmitter.next(result);
  }

  getCSVFile(url: string): Observable<string> {
    return this.http.get(url, {responseType: 'text'});
  }

  /**
   * Returns the nshmp-haz results in S3.
   */
  getNshmpHazResults(): Observable<HazardResultsResponse> {
    return this.http.get<HazardResultsResponse>(this.AWS_URL);
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

}
