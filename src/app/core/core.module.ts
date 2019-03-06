import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NshmpControlPanelModule } from '@nshmp/nshmp-ng-template';

import { FormControlsComponent } from '../form-controls/form-controls.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    FormControlsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NshmpControlPanelModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormControlsComponent,
    MaterialModule,
    NshmpControlPanelModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
