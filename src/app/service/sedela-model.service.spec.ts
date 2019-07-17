import { TestBed } from '@angular/core/testing';

import { SedelaModelService } from './sedela-model.service';

describe('SedelaModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SedelaModelService = TestBed.get(SedelaModelService);
    expect(service).toBeTruthy();
  });
});
