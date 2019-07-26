import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../core/core.module';
import { AwsJobsComponent } from './aws-jobs.component';
import { AwsJobsRouter } from './aws-jobs-router.module';
import { AwsJobsControlPanelComponent } from './aws-jobs-control-panel/aws-jobs-control-panel.component';
import { AwsJobsMainContentComponent } from './aws-jobs-main-content/aws-jobs-main-content.component';

@NgModule({
  declarations: [
    AwsJobsComponent,
    AwsJobsControlPanelComponent,
    AwsJobsMainContentComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AwsJobsRouter
  ]
})
export class AwsJobsModule { }
