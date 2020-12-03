/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Dashboard.serviceService } from './dashboard.service.service';

describe('Service: Dashboard.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Dashboard.serviceService]
    });
  });

  it('should ...', inject([Dashboard.serviceService], (service: Dashboard.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
