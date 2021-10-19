import { TestBed } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

describe('InterceptorService', () => {
  let service: InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [InterceptorService] });
    service = TestBed.inject(InterceptorService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  /*describe('intercept', () => {
    it('makes expected calls', () => {
      const httpRequestStub: HttpRequest = <any>{};
      const httpHandlerStub: HttpHandler = <any>{};
      spyOn(httpRequestStub, 'clone').and.callThrough();
      spyOn(httpHandlerStub, 'handle').and.callThrough();
      service.intercept(httpRequestStub, httpHandlerStub);
      expect(httpRequestStub.clone).toHaveBeenCalled();
      expect(httpHandlerStub.handle).toHaveBeenCalled();
    });
  });*/
});
