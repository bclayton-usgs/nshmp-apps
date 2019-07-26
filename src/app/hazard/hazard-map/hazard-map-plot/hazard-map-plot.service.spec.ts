import { TestBed } from '@angular/core/testing';

import { HazardMapPlotService } from './hazard-map-plot.service';

describe('HazardMapPlotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HazardMapPlotService = TestBed.get(HazardMapPlotService);
    expect(service).toBeTruthy();
  });
});
