import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsJobsComponent } from './aws-jobs.component';

describe('AwsRunningJobsComponent', () => {
  let component: AwsJobsComponent;
  let fixture: ComponentFixture<AwsJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwsJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
