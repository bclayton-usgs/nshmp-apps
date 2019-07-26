import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HazardMapPlotResults } from './hazard-map-plot-results.model';

@Injectable({
  providedIn: 'root'
})
export class HazardMapPlotService {

  private geoJsonEmitter = new Subject<HazardMapPlotResults>();

  private clearMapEmitter = new Subject<void>();

  clearMapObserve(): Observable<void> {
    return this.clearMapEmitter.asObservable();
  }

  clearMapNext(): void {
    this.clearMapEmitter.next();
  }

  geoJsonObserve(): Observable<HazardMapPlotResults> {
    return this.geoJsonEmitter.asObservable();
  }

  geoJsonNext(results: HazardMapPlotResults): void {
    this.geoJsonEmitter.next(results);
  }

}
