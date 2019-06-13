import { Component, OnInit, OnDestroy } from '@angular/core';
import { HazardResultsResponse } from '@nshmp/nshmp-web-utils';
import { SpinnerService } from '@nshmp/nshmp-ng-template';
import { Subscription } from 'rxjs';

import { HazardMapControlPanelService } from '../hazard-map-control-panel/hazard-map-control-panel.service';
import { HazardMapPlotService } from './hazard-map-plot.service';
import { HazardMapPlotResult } from '../hazard-map-results/hazard-map-plot-result.model';
import { HazardMapPlotResultsService } from '../hazard-map-results/hazard-map-plot-results.service';

@Component({
  selector: 'app-hazard-map-plot',
  templateUrl: './hazard-map-plot.component.html',
  styleUrls: ['./hazard-map-plot.component.scss']
})
export class HazardMapPlotComponent implements OnInit, OnDestroy {

  /* Data type menu subscription */
  dataTypeSubscription: Subscription;

  /* Hazard results subscription */
  mapResultsSubscription: Subscription;

  /* Control panel service plot map subscription */
  plotMapSubsciption: Subscription;

  constructor(
      private controlPanelService: HazardMapControlPanelService,
      private mapPlotService: HazardMapPlotService,
      private mapResultsService: HazardMapPlotResultsService,
      private spinner: SpinnerService) { }

  ngOnInit() {
    this.mapResultsSubscription = this.mapResultsService.getResultsObserve().subscribe(results => {
      this.plotMap(results[0]);
      this.mapPlotService.mapResultsNext(results);
    });

    this.plotMapSubsciption = this.controlPanelService.plotMapObserve()
        .subscribe(values => this.mapResultsService.getResults(values));

    this.dataTypeSubscription = this.controlPanelService.dataTypeObserve()
        .subscribe(result => this.plotMap(result));
  }

  ngOnDestroy() {
    this.dataTypeSubscription.unsubscribe();
    this.mapResultsSubscription.unsubscribe();
    this.plotMapSubsciption.unsubscribe();
  }

  plotMap(result: HazardMapPlotResult): void {
    this.spinner.remove();
    const reader = new FileReader();

    reader.readAsText(result.resultBlob);
    reader.onload = () => {
      const hazardResult = JSON.parse(reader.result as string) as HazardResultsResponse;
      console.log(hazardResult);
      console.log(result.getIml());
    };
  }

}
