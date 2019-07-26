import { Component, OnInit, OnDestroy } from '@angular/core';
import { Navigation, NavigationService } from '@nshmp/nshmp-ng-template';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  routerSubscription: Subscription;

  navigationList: Navigation[] = [
    {
      display: 'Dashboard',
      routerLink: ''
    }, {
      display: 'Exceedance Explorer',
      routerLink: 'exceedance-explorer'
    }, {
      display: 'Hazard Map',
      routerLink: 'hazard-map'
    }, {
      display: 'AWS Running Jobs',
      routerLink: 'aws-jobs'
    }
  ];

  constructor(
    private navigationService: NavigationService,
    private router: Router,
    private titleService: Title) {}

  ngOnInit() {
    this.navigationService.set(this.navigationList);

    this.routerSubscription = this.router.events.subscribe(() => {
      this.setTitle();
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private setTitle() {
    const currentRoute = this.navigationList.find(nav => {
      return `/${nav.routerLink}` === this.router.url.split('?').shift();
    });

    this.titleService.setTitle(currentRoute.display);
  }

}
