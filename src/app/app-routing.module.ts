import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'exceedance-explorer',
    loadChildren: './exceedance-explorer/exceedance-explorer.module#ExceedanceExplorerModule'
  }, {
    path: 'hazard-map',
    loadChildren: './hazard/hazard-map/hazard-map.module#HazardMapModule'
  }, {
    path: 'aws-jobs',
    loadChildren: './aws/aws-jobs/aws-jobs.module#AwsJobsModule'
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
