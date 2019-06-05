import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardMapControlPanelComponent } from './hazard-map-control-panel.component';

describe('HazardMapControlPanelComponent', () => {
  let component: HazardMapControlPanelComponent;
  let fixture: ComponentFixture<HazardMapControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazardMapControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardMapControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
