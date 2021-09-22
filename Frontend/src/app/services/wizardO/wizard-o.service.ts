import { Injectable, Type } from '@angular/core';
import { NgWizardConfig, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { isObservable, Observable } from 'rxjs';
import { BrandComponent } from 'src/app/components/brand/brand.component';
import { CarComponent } from 'src/app/components/car/car.component';
import { CLientesComponent } from 'src/app/components/clientes/clientes.component';
import { InventarioComponent } from 'src/app/components/inventario/inventario.component';
import { MechanicComponent } from 'src/app/components/Mechanic/Mechanic.component';
import { OrdenDeTrabajoComponent } from 'src/app/components/orden-de-trabajo/orden-de-trabajo.component';
import { ProveedoresComponent } from 'src/app/components/proveedores/proveedores.component';

@Injectable({
  providedIn: 'root'
})
export class WizardOService {

  constructor() {
  }

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {

    }
  };

  stepDefinitions: StepDefinition[] = [
    {
      title: 'Mecanicos',
      description: 'Datos del mecanico',
      component: MechanicComponent,
      canEnter: this.validateStep.bind(this, 'entry'),
      canExit: this.validateStep.bind(this, 'exit'),
    },
    {
      title: 'Vehiculo',
      description: 'Datos del Vehiculo',
      component: CarComponent,
      canEnter: this.validateStep.bind(this, 'entry'),
      canExit: this.validateStep.bind(this, 'exit'),
    },
    {
      title: 'Poducto',
      description: 'Datos de los productos',
      component: InventarioComponent,
      canEnter: this.validateStep.bind(this, 'entry'),
      canExit: this.validateStep.bind(this, 'exit'),
    },
    {
      title: 'Descripcion',
      description: 'Descripcion del trabajo',
      component: OrdenDeTrabajoComponent,
      canEnter: this.validateStep.bind(this, 'entry'),
      canExit: this.validateStep.bind(this, 'exit'),
    },

  ];

  private validateStep(type: string, args: StepValidationArgs) {
    let step = type == 'entry' ? args.toStep : args.fromStep;
    let stepSpecificValidateMethod;

    if (step && step.componentRef) {
      stepSpecificValidateMethod = type == 'entry' ? step.componentRef.instance.validateEntryToStep : step.componentRef.instance.validateExitFromStep;
    }

    if (stepSpecificValidateMethod) {
      if (typeof stepSpecificValidateMethod === typeof true) {
        return <boolean>stepSpecificValidateMethod;
      }
      else if (stepSpecificValidateMethod instanceof Function) {
        stepSpecificValidateMethod = stepSpecificValidateMethod.bind(step.componentRef.instance);
        let result = stepSpecificValidateMethod();

        if (isObservable<boolean>(result)) {
          return result;
        }
        else if (typeof result === typeof true) {
          return <boolean>result;
        }
      }
    }

    return true;
  }
}

export interface StepDefinition {
  title: string;
  description: string;
  state?: STEP_STATE;
  component: Type<any>;
  canEnter?: boolean | ((args: StepValidationArgs) => boolean) | ((args: StepValidationArgs) => Observable<boolean>);
  canExit?: boolean | ((args: StepValidationArgs) => boolean) | ((args: StepValidationArgs) => Observable<boolean>);
}
