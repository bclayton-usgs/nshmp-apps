import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HazardMapControlPanelService } from '../hazard-map-control-panel/hazard-map-control-panel.service';
import { HazardMap } from '../hazard-map.model';

@Component({
  selector: 'app-hazard-map-plot',
  templateUrl: './hazard-map-plot.component.html',
  styleUrls: ['./hazard-map-plot.component.scss']
})
export class HazardMapPlotComponent implements OnInit, OnDestroy {

  /* Control panel service plot map subscription */
  plotMapSubsciption: Subscription;

  constructor(
      private controlPanelService: HazardMapControlPanelService) { }

  ngOnInit() {
    this.plotMapSubsciption = this.controlPanelService.plotMapObserve()
        .subscribe(values => this.plotMap(values));
  }

  ngOnDestroy() {
    this.plotMapSubsciption.unsubscribe();
  }

  getHazardOutput(values: HazardMap): void {
    const url = 'http://igskcicgusclst2:8080/nshmp-site-ws/basin';
  }

  plotMap(values: HazardMap): void {
    this.getHazardOutput(values);

  }

}
