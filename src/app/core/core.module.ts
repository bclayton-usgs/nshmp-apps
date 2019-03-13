import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NshmpControlPanelModule } from '@nshmp/nshmp-ng-template';

import { FormControlsComponent } from '../form-controls/form-controls.component';
import { MaterialModule } from './material.module';
import { GmmMenuComponent } from '../gmm/gmm-menu/gmm-menu.component';

@NgModule({
  declarations: [
    FormControlsComponent,
    GmmMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NshmpControlPanelModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    FormControlsComponent,
    GmmMenuComponent,
    MaterialModule,
    NshmpControlPanelModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CoreModule { }
