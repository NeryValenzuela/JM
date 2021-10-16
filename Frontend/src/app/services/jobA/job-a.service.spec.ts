import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { JobAService } from './job-a.service';

describe('JobAService', () => {
  let service: JobAService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobAService]
    });
    service = TestBed.inject(JobAService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.get().subscribe(res => {
       /* expect(res).toEqual();*/
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
     /* req.flush();*/
      httpTestingController.verify();
    });
  });
});
