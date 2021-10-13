import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { FormsModule } from '@angular/forms';
import { ProveedoresComponent } from './proveedores.component';

describe('ProveedoresComponent', () => {
  let component: ProveedoresComponent;
  let fixture: ComponentFixture<ProveedoresComponent>;

  beforeEach(() => {
    const providerServiceStub = () => ({
      get: () => ({ subscribe: (f:any) => f({}) }),
      create: form => ({ subscribe: (f:any) => f({}) }),
      update: form => ({ subscribe: (f:any) => f({}) }),
      delete: uuidProvider => ({ subscribe: (f:any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProveedoresComponent],
      providers: [{ provide: ProviderService, useFactory: providerServiceStub }]
    });
    fixture = TestBed.createComponent(ProveedoresComponent);
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
      const providerServiceStub: ProviderService = fixture.debugElement.injector.get(
        ProviderService
      );
      spyOn(providerServiceStub, 'get').and.callThrough();
      component.get();
      expect(providerServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('ngSubmit', () => {
    it('makes expected calls', () => {
      const providerServiceStub: ProviderService = fixture.debugElement.injector.get(
        ProviderService
      );
      spyOn(component, 'get').and.callThrough();
      spyOn(providerServiceStub, 'create').and.callThrough();
      spyOn(providerServiceStub, 'update').and.callThrough();
      component.ngSubmit();
      expect(component.get).toHaveBeenCalled();
      expect(providerServiceStub.create).toHaveBeenCalled();
      expect(providerServiceStub.update).toBeDefined();
    });
  });
});
