
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdenTrabajoService } from 'src/app/services/ordenTrabajo/orden-trabajo.service';
import { CarService } from 'src/app/services/car/car.service';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';
import { ProductService } from 'src/app/services/product/product.service';
import { FormsModule } from '@angular/forms';
import { OrdenDeTrabajoComponent } from './orden-de-trabajo.component';

describe('OrdenDeTrabajoComponent', () => {
  let component: OrdenDeTrabajoComponent;
  let fixture: ComponentFixture<OrdenDeTrabajoComponent>;

  beforeEach(() => {
    const ordenTrabajoServiceStub = () => ({
      get: () => ({ subscribe: (f:any) => f({}) }),
      create: (form:any) => ({ subscribe: (f:any) => f({}) }),
      update: (form:any) => ({ subscribe: (f:any) => f({}) }),
      delete: (uuidWorkKog:any) => ({ subscribe: (f:any) => f({}) })
    });
    const carServiceStub = () => ({ get: () => ({ subscribe: (f:any) => f({}) }) });
    const mechanicServiceStub = () => ({
      get: () => ({ subscribe: (f:any) => f({}) })
    });
    const productServiceStub = () => ({
      get: () => ({ subscribe: (f:any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrdenDeTrabajoComponent],
      providers: [
        { provide: OrdenTrabajoService, useFactory: ordenTrabajoServiceStub },
        { provide: CarService, useFactory: carServiceStub },
        { provide: MechanicService, useFactory: mechanicServiceStub },
        { provide: ProductService, useFactory: productServiceStub }
      ]
    });
    fixture = TestBed.createComponent(OrdenDeTrabajoComponent);
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
      spyOn(component, 'getMechanic').and.callThrough();
      spyOn(component, 'getCar').and.callThrough();
      spyOn(component, 'getProduct').and.callThrough();
      component.ngOnInit();
      expect(component.get).toHaveBeenCalled();
      expect(component.getMechanic).toHaveBeenCalled();
      expect(component.getCar).toHaveBeenCalled();
      expect(component.getProduct).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('makes expected calls', () => {
      const ordenTrabajoServiceStub: OrdenTrabajoService = fixture.debugElement.injector.get(
        OrdenTrabajoService
      );
      spyOn(ordenTrabajoServiceStub, 'get').and.callThrough();
      component.get();
      expect(ordenTrabajoServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('getCar', () => {
    it('makes expected calls', () => {
      const carServiceStub: CarService = fixture.debugElement.injector.get(
        CarService
      );
      spyOn(carServiceStub, 'get').and.callThrough();
      component.getCar();
      expect(carServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('getMechanic', () => {
    it('makes expected calls', () => {
      const mechanicServiceStub: MechanicService = fixture.debugElement.injector.get(
        MechanicService
      );
      spyOn(mechanicServiceStub, 'get').and.callThrough();
      component.getMechanic();
      expect(mechanicServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('getProduct', () => {
    it('makes expected calls', () => {
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );
      spyOn(productServiceStub, 'get').and.callThrough();
      component.getProduct();
      expect(productServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('ngSubmit', () => {
    it('makes expected calls', () => {
      const ordenTrabajoServiceStub: OrdenTrabajoService = fixture.debugElement.injector.get(
        OrdenTrabajoService
      );
      spyOn(component, 'get').and.callThrough();
      spyOn(ordenTrabajoServiceStub, 'create').and.callThrough();
      spyOn(ordenTrabajoServiceStub, 'update').and.callThrough();
      component.ngSubmit();
      expect(component.get).toBeDefined();
      expect(ordenTrabajoServiceStub.create).toBeDefined();
      expect(ordenTrabajoServiceStub.update).toBeDefined();
    });
  });
});
