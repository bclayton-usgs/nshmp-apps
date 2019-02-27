import { Component, OnInit } from '@angular/core';
import { Navigation } from '@nshmp/nshmp-ng-template';

import { NavigationListService } from './shared/navigation-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nshmp-haz-web-apps';

  navigationList: Navigation[];

  constructor(private navListService: NavigationListService) {}

  ngOnInit() {
    this.navigationList = this.navListService.getNavList();
  }

}
