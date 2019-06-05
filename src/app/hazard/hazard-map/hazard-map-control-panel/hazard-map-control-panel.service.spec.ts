import { TestBed } from '@angular/core/testing';

import { HazardMapControlPanelService } from './hazard-map-control-panel.service';

describe('HazardMapControlPanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HazardMapControlPanelService = TestBed.get(HazardMapControlPanelService);
    expect(service).toBeTruthy();
  });
});
