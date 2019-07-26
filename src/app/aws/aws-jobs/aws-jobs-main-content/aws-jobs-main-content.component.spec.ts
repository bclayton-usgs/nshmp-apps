import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsJobsMainContentComponent } from './aws-jobs-main-content.component';

describe('AwsJobsMainContentComponent', () => {
  let component: AwsJobsMainContentComponent;
  let fixture: ComponentFixture<AwsJobsMainContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwsJobsMainContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsJobsMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
