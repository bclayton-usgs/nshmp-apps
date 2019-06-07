import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HazardMapControlPanelService } from '../hazard-map-control-panel/hazard-map-control-panel.service';
import { HazardMap } from '../hazard-map.model';
import { SpinnerService } from '@nshmp/nshmp-ng-template';

@Component({
  selector: 'app-hazard-map-plot',
  templateUrl: './hazard-map-plot.component.html',
  styleUrls: ['./hazard-map-plot.component.scss']
})
export class HazardMapPlotComponent implements OnInit, OnDestroy {

  /* Control panel service plot map subscription */
  plotMapSubsciption: Subscription;

  constructor(
      private controlPanelService: HazardMapControlPanelService,
      private spinner: SpinnerService) { }

  ngOnInit() {
    this.plotMapSubsciption = this.controlPanelService.plotMapObserve()
        .subscribe(values => this.plotMap(values));
  }

  ngOnDestroy() {
    this.plotMapSubsciption.unsubscribe();
  }

  getHazardOutput(values: HazardMap): void {
    const socket = new WebSocket('ws://localhost:8080/nshmp-haz-ws/hazard-socket');

    socket.onopen = (event) => {
      this.spinner.show('Loading ...', null);
      console.log('onopen', event);
      socket.send(values.zipFile);
    };

    socket.onmessage = (message) => {
      console.log('onmessage');
      console.log(JSON.parse(message.data));
    };

    socket.onclose = () => {
      console.log('Connection closed');
      this.spinner.remove();
    };

  }

  plotMap(values: HazardMap): void {
    this.getHazardOutput(values);

  }

}
