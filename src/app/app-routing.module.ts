import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'response-spectra',
    loadChildren: './gmm/response-spectra/response-spectra.module#ResponseSpectraModule'
  }, {
    path: 'exceedance-explorer',
    loadChildren: './exceedance-explorer/exceedance-explorer.module#ExceedanceExplorerModule'
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
