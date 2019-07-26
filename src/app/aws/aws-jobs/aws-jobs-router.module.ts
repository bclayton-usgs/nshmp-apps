import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AwsJobsComponent } from './aws-jobs.component';

const routes: Routes = [
  {
    path: '',
    component: AwsJobsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwsJobsRouter { }

