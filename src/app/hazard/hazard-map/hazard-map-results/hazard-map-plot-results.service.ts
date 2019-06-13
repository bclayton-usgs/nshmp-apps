import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HazardResultsResponse, NshmpError } from '@nshmp/nshmp-web-utils';
import { SpinnerService } from '@nshmp/nshmp-ng-template';

import { HazardMapPlotResult } from './hazard-map-plot-result.model';
import { HazardMapFormValues } from '../hazard-map-form-values.model';

/**
 * WebSocket service to connect to nshmp-haz-ws/hazard-results
 * and get the curve files.
 */
@Injectable({providedIn: 'root'})
export class HazardMapPlotResultsService {

  private getResultsEmitter = new Subject<HazardMapPlotResult[]>();
  private wsUrl = 'ws://localhost:8080/nshmp-haz-ws/hazard-results';

  constructor(private spinner: SpinnerService) { }

  /**
   * Returns the observable.
   */
  getResultsObserve(): Observable<HazardMapPlotResult[]> {
    return this.getResultsEmitter.asObservable();
  }

  /**
   * Connect to nshmp-haz-ws/hazard-results WebSocket to get results.
   *
   * @param values The hazard map form values
   */
  getResults(formValues: HazardMapFormValues): void {
    this.connectSocket(formValues)
        .catch(err => {
          NshmpError.throwError(err);
        });
  }

  private connectSocket(formValues: HazardMapFormValues): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const socket = new WebSocket(this.wsUrl);
      const promises: Promise<void>[] = [];
      const results: HazardMapPlotResult[] = [];

      socket.onopen = () => {
        this.onOpen(socket, formValues);
      };

      socket.onmessage = (event) => {
        this.onMessage(socket, event.data as Blob, promises, results);
      };

      socket.onclose = () => {
        this.onClose(promises, results);
        resolve();
      };

      socket.onerror = () => {
        reject(`WebSocket connection failed [${this.wsUrl}]`);
        this.onError();
      };
    });

    return promise;
  }

  private closeSocket(socket: WebSocket): void {
    socket.close();
    this.spinner.remove();
  }

  private onOpen(socket: WebSocket, formValues: HazardMapFormValues): void {
    this.spinner.show('Loading ...', null, () => this.closeSocket(socket));
    socket.send(formValues.zipFile);
  }

  private onMessage(
      socket: WebSocket,
      blob: Blob,
      promises: Promise<void>[],
      results: HazardMapPlotResult[]): void {
    const promise = new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(blob);

      reader.onload = () => {
        let result = JSON.parse(reader.result as string) as HazardResultsResponse;
        if (result.status === 'error') {
          socket.close();
          const msg = 'message';
          reject(result[msg]);
        }

        const imt = result.response.imt;
        const dataType = result.response.dataType;
        const imls = result.response.imls;
        const hazardResult = new HazardMapPlotResult(blob, imt, imls, dataType);
        results.push(hazardResult);
        result = null;
        this.spinner.setText(`(${hazardResult.display} loaded) Loading ...`);
        resolve();
      };

      reader.onerror = () => {
        this.spinner.remove();
        reject(`Error connecting to ${this.wsUrl}`);
      };
    });
    promises.push(promise);

  }

  private onClose(promises: Promise<void>[], results: HazardMapPlotResult[]): void {
    this.spinner.remove();
    Promise.all(promises).then(() => {
      results.sort((a, b) => a.display.localeCompare(b.display));
      this.getResultsEmitter.next(results);
    }).catch(err => {
      NshmpError.throwError(err);
    });
  }

  private onError(): void {
    this.spinner.remove();
  }

}
