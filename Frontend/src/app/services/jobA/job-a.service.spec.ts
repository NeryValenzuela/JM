import { TestBed } from '@angular/core/testing';

import { JobAService } from './job-a.service';

describe('JobAService', () => {
  let service: JobAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
