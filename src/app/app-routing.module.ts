import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ExceedanceExplorerComponent } from './exceedance-explorer/exceedance-explorer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }, {
    path: 'exceedance-explorer',
    component: ExceedanceExplorerComponent
  }, {
    path: '**',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
