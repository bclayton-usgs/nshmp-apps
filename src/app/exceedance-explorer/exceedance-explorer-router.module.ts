import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExceedanceExplorerComponent } from './exceedance-explorer.component';

const exceedanceRoutes: Routes = [
  {
    path: '',
    component: ExceedanceExplorerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(exceedanceRoutes)],
  exports: [RouterModule]
})
export class ExceedanceExplorerRouterModule { }
