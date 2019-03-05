import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceedanceExplorerComponent } from './exceedance-explorer.component';

describe('ExceedanceExplorerComponent', () => {
  let component: ExceedanceExplorerComponent;
  let fixture: ComponentFixture<ExceedanceExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceedanceExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceedanceExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
