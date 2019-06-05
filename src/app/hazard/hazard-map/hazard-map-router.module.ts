import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HazardMapComponent } from './hazard-map.component';

const hazardMapRoutes: Routes = [
  {
    path: '',
    component: HazardMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(hazardMapRoutes)],
  exports: [RouterModule]
})
export class HazardMapRouterModule { }
