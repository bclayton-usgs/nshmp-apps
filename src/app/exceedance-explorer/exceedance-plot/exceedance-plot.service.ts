import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

/**
 * Service to tell if a plot line has been selected or if a plot empty.
 */
@Injectable({providedIn: 'root'})
export class ExceedancePlotService {

  private hasPlotEmitter = new Subject<boolean>();
  private hasSelectedEmitter = new Subject<boolean>();

  /**
   * Returns observable for has plot.
   */
  hasPlotObserve(): Observable<boolean> {
    return this.hasPlotEmitter.asObservable();
  }

  /**
   * Send next value for has plot.
   *
   * @param hasPlot Whether a plot exists
   */
  hasPlotNext(hasPlot: boolean): void {
    this.hasPlotEmitter.next(hasPlot);
  }

  /**
   * Returns observable for has selected.
   */
  hasSelectedObserve(): Observable<boolean> {
    return this.hasSelectedEmitter.asObservable();
  }

  /**
   * Send next value for has selected.
   *
   * @param hasSelected Whether a line is selected
   */
  hasSelectedNext(hasSelected: boolean): void {
    this.hasSelectedEmitter.next(hasSelected);
  }

}
