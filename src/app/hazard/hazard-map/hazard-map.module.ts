import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../core/core.module';
import { HazardMapComponent } from './hazard-map.component';
import { HazardMapRouterModule } from './hazard-map-router.module';
import { HazardMapControlPanelComponent } from './hazard-map-control-panel/hazard-map-control-panel.component';
import { HazardMapPlotComponent } from './hazard-map-plot/hazard-map-plot.component';

@NgModule({
  declarations: [
    HazardMapComponent,
    HazardMapControlPanelComponent,
    HazardMapPlotComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    HazardMapRouterModule
  ]
})
export class HazardMapModule { }
