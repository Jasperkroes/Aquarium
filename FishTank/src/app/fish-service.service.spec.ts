import { TestBed } from '@angular/core/testing';

import { FishServiceService } from './fish-service.service';

describe('FishServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishServiceService = TestBed.get(FishServiceService);
    expect(service).toBeTruthy();
  });
});
