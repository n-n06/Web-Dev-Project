import { TestBed } from '@angular/core/testing';

import { PublicProfilesService } from './public-profiles.service';

describe('PublicProfilesService', () => {
  let service: PublicProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
