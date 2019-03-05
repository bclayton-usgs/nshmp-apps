import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceedanceControlPanelComponent } from './exceedance-control-panel.component';

describe('ExceedanceControlPanelComponent', () => {
  let component: ExceedanceControlPanelComponent;
  let fixture: ComponentFixture<ExceedanceControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceedanceControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceedanceControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
