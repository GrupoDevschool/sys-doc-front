import { TestBed } from '@angular/core/testing';

import { RequestPropertyService } from './request-property.service';

describe('RequestPropertyService', () => {
  let service: RequestPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
