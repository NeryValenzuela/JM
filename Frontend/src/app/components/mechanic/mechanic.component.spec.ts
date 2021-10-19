import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';
import { FormsModule } from '@angular/forms';
import { MechanicComponent } from './mechanic.component';

describe('MechanicComponent', () => {
  let component: MechanicComponent;
  let fixture: ComponentFixture<MechanicComponent>;

  beforeEach(() => {
    const mechanicServiceStub = () => ({
      get: () => ({ subscribe: f => f({}) }),
      create: form => ({ subscribe: f => f({}) }),
      update: form => ({ subscribe: f => f({}) }),
      delete: uuidMechanic => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MechanicComponent],
      providers: [{ provide: MechanicService, useFactory: mechanicServiceStub }]
    });
    fixture = TestBed.createComponent(MechanicComponent);
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
      const mechanicServiceStub: MechanicService = fixture.debugElement.injector.get(
        MechanicService
      );
      spyOn(mechanicServiceStub, 'get').and.callThrough();
      component.get();
      expect(mechanicServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('ngSubmit', () => {
    it('makes expected calls', () => {
      const mechanicServiceStub: MechanicService = fixture.debugElement.injector.get(
        MechanicService
      );
      spyOn(component, 'get').and.callThrough();
      spyOn(mechanicServiceStub, 'create').and.callThrough();
      spyOn(mechanicServiceStub, 'update').and.callThrough();
      component.ngSubmit();
      expect(component.get).toHaveBeenCalled();
      expect(mechanicServiceStub.create).toHaveBeenCalled();
      expect(mechanicServiceStub.update).toHaveBeenCalled();
    });
  });
});
