import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';
import { JobAService } from 'src/app/services/jobA/job-a.service';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';
import { FormsModule } from '@angular/forms';
import { JobAComponent } from './job-a.component';

describe('JobAComponent', () => {
  let component: JobAComponent;
  let fixture: ComponentFixture<JobAComponent>;

  beforeEach(() => {
    const carServiceStub = () => ({ get: () => ({ subscribe: f => f({}) }) });
    const jobAServiceStub = () => ({
      get: () => ({ subscribe: f => f({}) }),
      create: form => ({ subscribe: f => f({}) }),
      update: form => ({ subscribe: f => f({}) }),
      delete: formDelete => ({ subscribe: f => f({}) }),
      Detail: dataBody => ({ subscribe: f => f({}) })
    });
    const mechanicServiceStub = () => ({
      get: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [JobAComponent],
      providers: [
        { provide: CarService, useFactory: carServiceStub },
        { provide: JobAService, useFactory: jobAServiceStub },
        { provide: MechanicService, useFactory: mechanicServiceStub }
      ]
    });
    fixture = TestBed.createComponent(JobAComponent);
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
      component.ngOnInit();
      expect(component.get).toHaveBeenCalled();
      expect(component.getMechanic).toHaveBeenCalled();
      expect(component.getCar).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('makes expected calls', () => {
      const jobAServiceStub: JobAService = fixture.debugElement.injector.get(
        JobAService
      );
      spyOn(jobAServiceStub, 'get').and.callThrough();
      component.get();
      expect(jobAServiceStub.get).toHaveBeenCalled();
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

  describe('ngSubmit', () => {
    it('makes expected calls', () => {
      const jobAServiceStub: JobAService = fixture.debugElement.injector.get(
        JobAService
      );
      spyOn(component, 'get').and.callThrough();
      spyOn(jobAServiceStub, 'create').and.callThrough();
      spyOn(jobAServiceStub, 'update').and.callThrough();
      component.ngSubmit();
      expect(component.get).toHaveBeenCalled();
      expect(jobAServiceStub.create).toHaveBeenCalled();
      expect(jobAServiceStub.update).toHaveBeenCalled();
    });
  });
});
