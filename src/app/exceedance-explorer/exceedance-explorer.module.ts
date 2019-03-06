import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { ExceedanceExplorerComponent } from './exceedance-explorer.component';
import { ExceedanceControlPanelComponent } from './exceedance-control-panel/exceedance-control-panel.component';
import { ExceedancePlotComponent } from './exceedance-plot/exceedance-plot.component';
import { ExceedanceExplorerRouterModule } from './exceedance-explorer-router.module';

@NgModule({
  declarations: [
    ExceedanceExplorerComponent,
    ExceedanceControlPanelComponent,
    ExceedancePlotComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ExceedanceExplorerRouterModule
  ]
})
export class ExceedanceExplorerModule { }
