import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardMapComponent } from './hazard-map.component';

describe('HazardMapComponent', () => {
  let component: HazardMapComponent;
  let fixture: ComponentFixture<HazardMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazardMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
