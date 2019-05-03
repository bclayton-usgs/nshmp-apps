import { TestBed } from '@angular/core/testing';

import { GmmMenuService } from './gmm-menu.service';

describe('GmmMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GmmMenuService = TestBed.get(GmmMenuService);
    expect(service).toBeTruthy();
  });
});
