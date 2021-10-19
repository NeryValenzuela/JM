import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CustumerService } from 'src/app/services/custumer/custumer.service';
import { FormsModule } from '@angular/forms';
import { CLientesComponent } from './clientes.component';

describe('CLientesComponent', () => {
  let component: CLientesComponent;
  let fixture: ComponentFixture<CLientesComponent>;

  beforeEach(() => {
    const custumerServiceStub = () => ({
      get: () => ({ subscribe: f => f({}) }),
      create: form => ({ subscribe: f => f({}) }),
      update: form => ({ subscribe: f => f({}) }),
      delete: uuidCustumer => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CLientesComponent],
      providers: [{ provide: CustumerService, useFactory: custumerServiceStub }]
    });
    fixture = TestBed.createComponent(CLientesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`mode has default value`, () => {
    expect(component.mode).toEqual(`Guardar`);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'get').and.callThrough();
      component.ngOnInit();
      expect(component.get).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('makes expected calls', () => {
      const custumerServiceStub: CustumerService = fixture.debugElement.injector.get(
        CustumerService
      );
      spyOn(custumerServiceStub, 'get').and.callThrough();
      component.get();
      expect(custumerServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('ngSubmit', () => {
    it('makes expected calls', () => {
      const custumerServiceStub: CustumerService = fixture.debugElement.injector.get(
        CustumerService
      );
      spyOn(component, 'get').and.callThrough();
      spyOn(custumerServiceStub, 'create').and.callThrough();
      spyOn(custumerServiceStub, 'update').and.callThrough();
      component.ngSubmit();
      expect(component.get).toHaveBeenCalled();
      expect(custumerServiceStub.create).toHaveBeenCalled();
      expect(custumerServiceStub.update).toHaveBeenCalled();
    });
  });
});
