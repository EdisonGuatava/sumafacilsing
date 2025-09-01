import { TestBed } from '@angular/core/testing';

import { ApisolicitudService } from './apisolicitud.service';

describe('ApisolicitudService', () => {
  let service: ApisolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
