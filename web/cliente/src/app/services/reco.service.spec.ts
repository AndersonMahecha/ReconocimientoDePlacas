import { TestBed } from '@angular/core/testing';

import { RecoService } from './reco.service';

describe('RecoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecoService = TestBed.get(RecoService);
    expect(service).toBeTruthy();
  });
});
