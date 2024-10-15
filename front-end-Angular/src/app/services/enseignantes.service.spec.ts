import { TestBed } from '@angular/core/testing';

import { EnseignantesService } from './enseignantes.service';

describe('EnseignantesService', () => {
  let service: EnseignantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnseignantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
