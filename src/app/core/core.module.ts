import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NshmpControlPanelModule, NshmpFormFieldModule } from '@nshmp/nshmp-ng-template';

import { MaterialModule } from './material.module';
import { GmmMenuComponent } from '../gmm/gmm-menu/gmm-menu.component';

@NgModule({
  declarations: [
    GmmMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NshmpControlPanelModule,
    ReactiveFormsModule,
    HttpClientModule,
    NshmpFormFieldModule
  ],
  exports: [
    GmmMenuComponent,
    MaterialModule,
    NshmpControlPanelModule,
    ReactiveFormsModule,
    HttpClientModule,
    NshmpFormFieldModule
  ]
})
export class CoreModule { }
