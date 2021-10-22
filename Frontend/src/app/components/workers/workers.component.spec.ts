
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';
import { FormsModule } from '@angular/forms';
import { WorkersComponent } from './workers.component';

describe('WorkersComponent', () => {
  let component: WorkersComponent;
  let fixture: ComponentFixture<WorkersComponent>;

  beforeEach(() => {
    const mechanicServiceStub = () => ({
      get: () => ({ subscribe: (f:any) => f({}) }),
      create: (form:any) => ({ subscribe: (f:any) => f({}) }),
      update: (form:any) => ({ subscribe: (f:any) => f({}) }),
      delete: (uuidMechanic:any) => ({ subscribe: (f:any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WorkersComponent],
      providers: [{ provide: MechanicService, useFactory: mechanicServiceStub }]
    });
    fixture = TestBed.createComponent(WorkersComponent);
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
      expect(component.get).toBeDefined();
      expect(mechanicServiceStub.create).toBeDefined();
      expect(mechanicServiceStub.update).toBeDefined();
    });
  });
});

