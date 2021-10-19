import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { FormsModule } from '@angular/forms';
import { InventarioComponent } from './inventario.component';

describe('InventarioComponent', () => {
  let component: InventarioComponent;
  let fixture: ComponentFixture<InventarioComponent>;

  beforeEach(() => {
    const productServiceStub = () => ({
      get: () => ({ subscribe: (f:any) => f({}) }),
      create: form => ({ subscribe: (f:any)=> f({}) }),
      update: form => ({ subscribe: (f:any)=> f({}) }),
      delete: uuidProduct => ({ subscribe: (f:any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InventarioComponent],
      providers: [{ provide: ProductService, useFactory: productServiceStub }]
    });
    fixture = TestBed.createComponent(InventarioComponent);
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
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );
      spyOn(productServiceStub, 'get').and.callThrough();
      component.get();
      expect(productServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('ngSubmit', () => {
    it('makes expected calls', () => {
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );
      spyOn(component, 'get').and.callThrough();
      spyOn(productServiceStub, 'create').and.callThrough();
      spyOn(productServiceStub, 'update').and.callThrough();
      component.ngSubmit();
      expect(component.get).toHaveBeenCalled();
      expect(productServiceStub.create).toHaveBeenCalled();
      expect(productServiceStub.update).toHaveBeenCalled();
    });
  });
});
