import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectraPlotComponent } from './spectra-plot.component';

describe('SpectraPlotComponent', () => {
  let component: SpectraPlotComponent;
  let fixture: ComponentFixture<SpectraPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpectraPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectraPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
