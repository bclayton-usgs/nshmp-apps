import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectraControlPanelComponent } from './spectra-control-panel.component';

describe('SpectraControlPanelComponent', () => {
  let component: SpectraControlPanelComponent;
  let fixture: ComponentFixture<SpectraControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpectraControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectraControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
