import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponseSpectraComponent } from './response-spectra.component';

const spectraRoutes: Routes = [
  {
    path: '',
    component: ResponseSpectraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(spectraRoutes)],
  exports: [RouterModule]
})
export class ResponseSpectraRouterModule { }
