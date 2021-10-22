import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthGuardGuard } from './auth-guard.guard';

describe('AuthGuardGuard', () => {
  let service: AuthGuardGuard;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array:any) => ({}) });
    const authServiceStub = () => ({ logIn: () => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AuthGuardGuard,
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    service = TestBed.inject(AuthGuardGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  /*describe('canActivate', () => {
    it('makes expected calls', () => {
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
      const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
      const routerStub: Router = TestBed.inject(Router);
      const authServiceStub: AuthService = TestBed.inject(AuthService);
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authServiceStub, 'logIn').and.callThrough();
      service.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(authServiceStub.logIn).toHaveBeenCalled();
    });
  });*/
});

