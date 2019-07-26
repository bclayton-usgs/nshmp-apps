import { TestBed } from '@angular/core/testing';

import { AwsJobsControlPanelService } from './aws-jobs-control-panel.service';

describe('AwsJobsControlPanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsJobsControlPanelService = TestBed.get(AwsJobsControlPanelService);
    expect(service).toBeTruthy();
  });
});
