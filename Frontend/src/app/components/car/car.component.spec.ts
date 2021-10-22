
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { LineService } from 'src/app/services/line/line.service';
import { CustumerService } from 'src/app/services/custumer/custumer.service';
import { FormsModule } from '@angular/forms';
import { CarComponent } from './car.component';

describe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;

  beforeEach(() => {
    const carServiceStub = () => ({
      get: () => ({ subscribe: (f:any) => f({}) }),
      create: (form:any) => ({ subscribe: (f:any) => f({}) }),
      update: (form:any) => ({ subscribe: (f:any) => f({}) }),
      delete: (uuidCar:any) => ({ subscribe: (f:any) => f({}) })
    });
    const brandServiceStub = () => ({ get: () => ({ subscribe: (f:any) => f({}) }) });
    const lineServiceStub = () => ({ get: () => ({ subscribe: (f:any) => f({}) }) });
    const custumerServiceStub = () => ({
      get: () => ({ subscribe: (f:any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CarComponent],
      providers: [
        { provide: CarService, useFactory: carServiceStub },
        { provide: BrandService, useFactory: brandServiceStub },
        { provide: LineService, useFactory: lineServiceStub },
        { provide: CustumerService, useFactory: custumerServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CarComponent);
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
      spyOn(component, 'getBrand').and.callThrough();
      spyOn(component, 'getLine').and.callThrough();
      spyOn(component, 'getCustumer').and.callThrough();
      component.ngOnInit();
      expect(component.get).toHaveBeenCalled();
      expect(component.getBrand).toHaveBeenCalled();
      expect(component.getLine).toHaveBeenCalled();
      expect(component.getCustumer).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('makes expected calls', () => {
      const carServiceStub: CarService = fixture.debugElement.injector.get(
        CarService
      );
      spyOn(carServiceStub, 'get').and.callThrough();
      component.get();
      expect(carServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('getBrand', () => {
    it('makes expected calls', () => {
      const brandServiceStub: BrandService = fixture.debugElement.injector.get(
        BrandService
      );
      spyOn(brandServiceStub, 'get').and.callThrough();
      component.getBrand();
      expect(brandServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('getLine', () => {
    it('makes expected calls', () => {
      const lineServiceStub: LineService = fixture.debugElement.injector.get(
        LineService
      );
      spyOn(lineServiceStub, 'get').and.callThrough();
      component.getLine();
      expect(lineServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('getCustumer', () => {
    it('makes expected calls', () => {
      const custumerServiceStub: CustumerService = fixture.debugElement.injector.get(
        CustumerService
      );
      spyOn(custumerServiceStub, 'get').and.callThrough();
      component.getCustumer();
      expect(custumerServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('ngSubmit', () => {
    it('makes expected calls', () => {
      const carServiceStub: CarService = fixture.debugElement.injector.get(
        CarService
      );
      spyOn(component, 'get').and.callThrough();
      spyOn(carServiceStub, 'create').and.callThrough();
      spyOn(carServiceStub, 'update').and.callThrough();
      component.ngSubmit();
      expect(component.onReset).toBeDefined();
      expect(carServiceStub.create).toBeDefined();
      expect(carServiceStub.update).toBeDefined();
    });
  });
});

