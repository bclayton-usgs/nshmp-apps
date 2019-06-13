import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HazardMapPlotResult } from '../hazard-map-results/hazard-map-plot-result.model';

/**
 * Service to pass hazard curve results.
 */
@Injectable({providedIn: 'root'})
export class HazardMapPlotService {

  private mapResultsEmitter = new Subject<HazardMapPlotResult[]>();

  /**
   * Returns the obervable for new hazard map results.
   */
  mapResultsObserve(): Observable<HazardMapPlotResult[]> {
    return this.mapResultsEmitter.asObservable();
  }

  /**
   * Send next results.
   *
   * @param results The hazard results
   */
  mapResultsNext(results: HazardMapPlotResult[]): void {
    this.mapResultsEmitter.next(results);
  }
}
