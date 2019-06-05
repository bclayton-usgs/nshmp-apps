import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HazardMap } from '../hazard-map.model';

@Injectable({
  providedIn: 'root'
})
export class HazardMapControlPanelService {

  private plotMapEmitter = new Subject<HazardMap>();

  plotMapObserve(): Observable<HazardMap> {
    return this.plotMapEmitter.asObservable();
  }

  plotMapNext(hazardMap: HazardMap): void {
    this.plotMapEmitter.next(hazardMap);
  }

}
