import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouterModule } from './dashboard-router.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DashboardRouterModule
  ]
})
export class DashboardModule { }
