import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HazardMapFormValues } from '../hazard-map-form-values.model';
import { HazardMapPlotResult } from '../hazard-map-results/hazard-map-plot-result.model';

/**
 * Hazard map plot control panel service.
 */
@Injectable({ providedIn: 'root' })
export class HazardMapControlPanelService {

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
