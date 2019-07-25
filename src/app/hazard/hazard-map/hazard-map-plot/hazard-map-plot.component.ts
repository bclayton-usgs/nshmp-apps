import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef } from '@angular/core';
import {
  MapboxGLPlot,
  MapboxGLView,
  MapboxGLLegendOptions,
  MapboxGLSubViewOptions } from '@nshmp/nshmp-d3';
import { NshmpError } from '@nshmp/nshmp-web-utils';
import { Subscription } from 'rxjs';

import { HazardMapPlotService } from './hazard-map-plot.service';
import { HazardMapPlotResults } from './hazard-map-plot-results.model';

@Component({
  selector: 'app-hazard-map-plot',
  templateUrl: './hazard-map-plot.component.html',
  styleUrls: ['./hazard-map-plot.component.scss']
})
export class HazardMapPlotComponent implements OnInit, OnDestroy {

  @ViewChild('map') plotEl: ElementRef<HTMLElement>;

  private view: MapboxGLView;
  private map: MapboxGLPlot;
  private plotSubscription = new Subscription();

  constructor(private plotService: HazardMapPlotService) { }

  ngOnInit() {
    this.view = this.createView();
    this.map = new MapboxGLPlot(this.view);
    this.plotSubscription = this.plotService.geoJsonObserve()
        .subscribe(results => this.plot(results),
        err => NshmpError.throwError(err));
  }

  ngOnDestroy() {
    this.plotSubscription.unsubscribe();
  }

  plot(results: HazardMapPlotResults): void {
    this.view.setTitle(results.mapTitle);
    this.map.plotMap(results.fc, results.propertyName);
    this.map.setLegendTitle(results.legendTitle);
  }

  private createView(): MapboxGLView {
    const legendOptions: MapboxGLLegendOptions = {
      barHeight: 20,
      barValueFontSize: 12,
      titleFontSize: 14,
      paddingLeft: 20,
      paddingRight: 20,
      width: 350
    };

    const subViewOptions = MapboxGLSubViewOptions.builder()
        .legendOptions(legendOptions)
        .build();

    return MapboxGLView.builder()
        .containerEl(this.plotEl.nativeElement)
        .upperSubViewOptions(subViewOptions)
        .build();
  }

}
