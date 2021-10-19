import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    const breakpointObserverStub = () => ({});
    const authServiceStub = () => ({ logIn: () => ({}), logout: () => ({}) });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavComponent],
      providers: [
        { provide: BreakpointObserver, useFactory: breakpointObserverStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(authServiceStub, 'logIn').and.callThrough();
      component.login();
      expect(authServiceStub.logIn).toHaveBeenCalled();
    });
  });

  describe('logOut', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(authServiceStub, 'logout').and.callThrough();
      component.logOut();
      expect(authServiceStub.logout).toHaveBeenCalled();
    });
  });
});
