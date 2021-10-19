import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { OrdenTrabajoService } from './orden-trabajo.service';

describe('OrdenTrabajoService', () => {
  let service: OrdenTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdenTrabajoService]
    });
    service = TestBed.inject(OrdenTrabajoService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.get().subscribe(res => {
        expect(res).toEqual('any');
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush('any');
      httpTestingController.verify();
    });
  });
});
