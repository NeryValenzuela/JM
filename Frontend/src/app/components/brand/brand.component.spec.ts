import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrandService } from 'src/app/services/brand/brand.service';
import { FormsModule } from '@angular/forms';
import { BrandComponent } from './brand.component';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;

  beforeEach(() => {
    const brandServiceStub = () => ({
      get: () => ({ subscribe: f => f({}) }),
      create: form => ({ subscribe: f => f({}) }),
      update: form => ({ subscribe: f => f({}) }),
      delete: uuidBrand => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BrandComponent],
      providers: [{ provide: BrandService, useFactory: brandServiceStub }]
    });
    fixture = TestBed.createComponent(BrandComponent);
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
      const brandServiceStub: BrandService = fixture.debugElement.injector.get(
        BrandService
      );
      spyOn(brandServiceStub, 'get').and.callThrough();
      component.get();
      expect(brandServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('ngSubmit', () => {
    it('makes expected calls', () => {
      const brandServiceStub: BrandService = fixture.debugElement.injector.get(
        BrandService
      );
      spyOn(component, 'get').and.callThrough();
      spyOn(brandServiceStub, 'create').and.callThrough();
      spyOn(brandServiceStub, 'update').and.callThrough();
      component.ngSubmit();
      expect(component.get).toHaveBeenCalled();
      expect(brandServiceStub.create).toHaveBeenCalled();
      expect(brandServiceStub.update).toHaveBeenCalled();
    });
  });
});
