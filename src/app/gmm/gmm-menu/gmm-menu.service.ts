import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { GmmUsageParameters } from '@nshmp/nshmp-web-utils';

@Injectable({
  providedIn: 'root'
})
export class GmmMenuService {

  private gmmParametersEmitter = new BehaviorSubject<GmmUsageParameters>(null);

  constructor() { }

  gmmParametersObserve(): Observable<GmmUsageParameters> {
    return this.gmmParametersEmitter.asObservable();
  }

  gmmParametersNext(parameters: GmmUsageParameters): void {
    this.gmmParametersEmitter.next(parameters);
  }

}
