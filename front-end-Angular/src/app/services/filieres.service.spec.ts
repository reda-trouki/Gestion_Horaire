import { TestBed } from '@angular/core/testing';

import { FilieresService } from './filieres.service';

describe('FilieresService', () => {
  let service: FilieresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilieresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
