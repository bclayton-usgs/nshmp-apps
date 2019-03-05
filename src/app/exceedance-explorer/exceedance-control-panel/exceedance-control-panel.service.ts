import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ExceedanceExplorer } from '../exceedance-explorer.model';

@Injectable({providedIn: 'root'})
export class ExceedanceControlPanelService {

  private addPlotEmitter = new Subject<ExceedanceExplorer>();
  private clearPlotEmitter = new Subject<void>();
  private removePlotEmitter = new Subject<void>();

  addPlotObserve(): Observable<ExceedanceExplorer> {
    return this.addPlotEmitter.asObservable();
  }

  addPlotNext(exceedanceExplorer: ExceedanceExplorer): void {
    this.addPlotEmitter.next(exceedanceExplorer);
  }

  clearPlotObserve(): Observable<void> {
    return this.clearPlotEmitter.asObservable();
  }

  clearPlotNext(): void {
    this.clearPlotEmitter.next();
  }

  removePlotObserve(): Observable<void> {
    return this.removePlotEmitter.asObservable();
  }

  removePlotNext(): void {
    this.removePlotEmitter.next();
  }

}
