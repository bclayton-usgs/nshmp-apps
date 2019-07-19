import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NshmpTemplateModule } from '@nshmp/nshmp-ng-template';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClient } from '@angular/common/http';

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
  private readonly AWS_URL = 'https://kqyga0ebwe.execute-api.us-west-2.amazonaws.com/nshmp/nshmp-haz-results';
  private readonly DELAY = 10 * 60 * 1000;

  constructor(private http: HttpClient) {
    this.callNshmpHazResults();
    setInterval(this.callNshmpHazResults.bind(this), this.DELAY);
  }

  callNshmpHazResults() {
    this.http.get(this.AWS_URL).subscribe(() => console.log('Called'));
  }
}
