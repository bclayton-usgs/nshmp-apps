import { Injectable } from '@angular/core';
import { Navigation } from '@nshmp/nshmp-ng-template';

@Injectable({ providedIn: 'root' })
export class NavigationListService {

  private navigationList: Navigation[] = [
    {
      display: 'Dashboard',
      routerLink: ''
    }
  ];

  getNavList() {
    return this.navigationList.slice();
  }

}
