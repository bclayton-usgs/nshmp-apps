import { Component, OnInit } from '@angular/core';
import { Navigation, NavigationService } from '@nshmp/nshmp-ng-template';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nshmp-apps';

  private navigationList: Navigation[] = [
    {
      display: 'Dashboard',
      routerLink: ''
    }, {
      display: 'Exceedance Explorer',
      routerLink: 'exceedance-explorer'
    }
  ];

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.set(this.navigationList);
  }

}
