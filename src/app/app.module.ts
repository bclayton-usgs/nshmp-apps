import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatTooltipModule
} from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NshmpTemplateModule } from '@nshmp/nshmp-ng-template';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExceedanceExplorerComponent } from './exceedance-explorer/exceedance-explorer.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { ExceedanceControlPanelComponent } from './exceedance-explorer/exceedance-control-panel/exceedance-control-panel.component';
import { ExceedancePlotComponent } from './exceedance-explorer/exceedance-plot/exceedance-plot.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ExceedanceExplorerComponent,
    FormControlsComponent,
    ExceedanceControlPanelComponent,
    ExceedancePlotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NshmpTemplateModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
