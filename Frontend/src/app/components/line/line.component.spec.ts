import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrandService } from 'src/app/services/brand/brand.service';
import { LineService } from 'src/app/services/line/line.service';
import { FormsModule } from '@angular/forms';
import { LineComponent } from './line.component';

describe('LineComponent', () => {
  let component: LineComponent;
  let fixture: ComponentFixture<LineComponent>;

  beforeEach(() => {
    const brandServiceStub = () => ({ get: () => ({ subscribe: f => f({}) }) });
    const lineServiceStub = () => ({
      get: () => ({ subscribe: f => f({}) }),
      create: form => ({ subscribe: f => f({}) }),
      update: form => ({ subscribe: f => f({}) }),
      delete: uuidLine => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LineComponent],
      providers: [
        { provide: BrandService, useFactory: brandServiceStub },
        { provide: LineService, useFactory: lineServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LineComponent);
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
      component.ngOnInit();
      expect(component.get).toHaveBeenCalled();
      expect(component.getBrand).toHaveBeenCalled();
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

  describe('get', () => {
    it('makes expected calls', () => {
      const lineServiceStub: LineService = fixture.debugElement.injector.get(
        LineService
      );
      spyOn(lineServiceStub, 'get').and.callThrough();
      component.get();
      expect(lineServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('ngSubmit', () => {
    it('makes expected calls', () => {
      const lineServiceStub: LineService = fixture.debugElement.injector.get(
        LineService
      );
      spyOn(component, 'get').and.callThrough();
      spyOn(lineServiceStub, 'create').and.callThrough();
      spyOn(lineServiceStub, 'update').and.callThrough();
      component.ngSubmit();
      expect(component.get).toHaveBeenCalled();
      expect(lineServiceStub.create).toHaveBeenCalled();
      expect(lineServiceStub.update).toHaveBeenCalled();
    });
  });
});
