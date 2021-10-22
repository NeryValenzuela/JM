
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useFactory: routerStub }]
    });
    service = TestBed.inject(AuthService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      service.logout();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});

