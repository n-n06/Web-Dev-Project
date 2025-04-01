import { TestBed } from '@angular/core/testing';

import { AlbumPackService } from './album-pack.service';

describe('AlbumPackService', () => {
  let service: AlbumPackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumPackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
