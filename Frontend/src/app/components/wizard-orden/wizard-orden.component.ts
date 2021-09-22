import { Component, OnInit } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of } from 'rxjs';
import { CustumerService } from 'src/app/services/custumer/custumer.service';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';
import { OrdenTrabajoService } from 'src/app/services/ordenTrabajo/orden-trabajo.service';


@Component({
  selector: 'app-wizard-orden',
  templateUrl: './wizard-orden.component.html',
  styleUrls: ['./wizard-orden.component.css']
})


export class WizardOrdenComponent implements OnInit {
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {}
  };

  dataSourceMech: any;
  dataSourceW: any;
  mode = "Guardar";

  formWorkLog = {
    uuidMechanic: "",
    uuidCar: "",
    uuidProduct: "",
    description: "",
    price: "",
    amountProduct:""
  }
  formCar = {
    uuidCar: "",
    uuidBrand: "",
    uuidLine: "",
    uuidCustumer: "",
    plate: "",
    year: "",
    color: "",
    status: ""
  }

  constructor(private ngWizardService: NgWizardService,
    private serviceMech: MechanicService,
    private serviceW: OrdenTrabajoService) {
  }

  ngOnInit() {
    //this.get();
    this.getMech();
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

//Funciones mecanico

getMech(): void {
  this.serviceMech.get().subscribe(
    (res) => {
      console.log(res)
      this.dataSourceMech = res;
    }, (err) => {
      console.log(err)
    }
  )
}
get(): void {
  this.serviceW.get().subscribe(
    (res) => {
      console.log(res)
      this.dataSourceW = res;
    }, (err) => {
      console.log(err)
    }
  )
}

onChangeMode(item: any, mode: string): void {
  if (mode === 'mechanic') {
this.formWorkLog.uuidMechanic = item;
console.log(this.formWorkLog.uuidMechanic);
  }
  else if (mode === 'mechanic') {
    this.formWorkLog.uuidMechanic = item;
    console.log(this.formWorkLog.uuidMechanic);
      }
  else if(mode === 'mechanic') {
    this.formWorkLog.uuidMechanic = item;
    console.log(this.formWorkLog.uuidMechanic);
      }
}



/*ngSubmitFinish(): void {
  if (this.formWorkLog.amountProduct !== "" && this.formWorkLog.price !== "" &&
    this.formWorkLog.description !== "" && this.formWorkLog.uuidProduct !== ""
    && this.formWorkLog.uuidCar !== "" && this.formWorkLog.uuidMechanic !== "") {
    if (this.mode === "Guardar") {
      this.serviceW.create(this.formWorkLog).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })

};*/
}
