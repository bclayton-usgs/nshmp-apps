import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsJobsControlPanelComponent } from './aws-jobs-control-panel.component';

describe('AwsJobsControlPanelComponent', () => {
  let component: AwsJobsControlPanelComponent;
  let fixture: ComponentFixture<AwsJobsControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwsJobsControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsJobsControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
