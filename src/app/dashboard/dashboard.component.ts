
import { Component, OnInit } from '@angular/core';
import { Navigation, NavigationService } from '@nshmp/nshmp-ng-template';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardList: Navigation[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.dashboardList = this.navigationService.get().filter(nav => nav.display !== 'Dashboard');
  }

}
