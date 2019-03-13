import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseSpectraComponent } from './response-spectra.component';
import { CoreModule } from '../../core/core.module';
import { ResponseSpectraRouterModule } from './response-spectra-router.module';
import { SpectraControlPanelComponent } from './spectra-control-panel/spectra-control-panel.component';
import { SpectraPlotComponent } from './spectra-plot/spectra-plot.component';

@NgModule({
  declarations: [
    ResponseSpectraComponent,
    SpectraControlPanelComponent,
    SpectraPlotComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ResponseSpectraRouterModule
  ]
})
export class ResponseSpectraModule { }
