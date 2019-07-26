import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NshmpTemplateModule } from '@nshmp/nshmp-ng-template';
import * as AWS from 'aws-sdk';
import Config from 'src/config.json';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

AWS.config.update(new AWS.Config({
  region: 'us-west-2',
  apiVersions: {
    lambda: '2015-03-31'
  },
  accessKeyId: Config.accessKeyId,
  secretAccessKey: Config.secretAccessKey
}));

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    NshmpTemplateModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {}
}
