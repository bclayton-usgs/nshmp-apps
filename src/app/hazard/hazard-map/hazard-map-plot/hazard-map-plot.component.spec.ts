import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardMapPlotComponent } from './hazard-map-plot.component';

describe('HazardMapPlotComponent', () => {
  let component: HazardMapPlotComponent;
  let fixture: ComponentFixture<HazardMapPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazardMapPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardMapPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
