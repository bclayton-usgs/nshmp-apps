import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceedancePlotComponent } from './exceedance-plot.component';

describe('ExceedancePlotComponent', () => {
  let component: ExceedancePlotComponent;
  let fixture: ComponentFixture<ExceedancePlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceedancePlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceedancePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
