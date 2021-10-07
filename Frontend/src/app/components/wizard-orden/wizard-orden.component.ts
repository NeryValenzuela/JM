import { Component, OnInit } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of } from 'rxjs';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { CustumerService } from 'src/app/services/custumer/custumer.service';
import { LineService } from 'src/app/services/line/line.service';
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
  dataSourceBrand: any;
  dataSourceLine: any;
  dataSourceCustumer: any;
  dataSourceCar: any;

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
    private serviceW: OrdenTrabajoService,
    private serviceCar: CarService,
    private serviceBrand: BrandService,
    private serviceLine: LineService,
    private serviceCustumer: CustumerService) {
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
 //Obtener datos de linea de vehiculo
 getLine(): void {
  this.serviceLine.get().subscribe(
    (res) => {
      this.dataSourceLine = res;
      console.log(res)
    }, (err) => {
      console.log(err)
    }
  )
}
///Obtener datos de Marca de vehiculo
getBrand(): void {
  this.serviceBrand.get().subscribe(
    (res) => {
      this.dataSourceBrand = res;
      console.log(res)
    }, (err) => {
      console.log(err)
    }
  )
}
 //Obtener datos del cliente
 getCustumer(): void {
  this.serviceCustumer.get().subscribe(
    (res) => {
      console.log(res)
      this.dataSourceCustumer = res;
    }, (err) => {
      console.log(err)
    }
  )
}

//*Funciones del Carro
ngSubmitCar(): void {
  if (this.formCar.status !== "" && this.formCar.color !== "" &&
    this.formCar.year !== "" && this.formCar.plate !== "" &&
    this.formCar.uuidCustumer !== "" && this.formCar.uuidLine !== "" &&
    this.formCar.uuidBrand !== "") {
    if (this.mode === "Guardar") {
      this.serviceCar.create(this.formCar).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })
    } else if (this.mode === "Editar") {
      this.serviceCar.update(this.formCar).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })
    }
  }
}

onResetCar(): void {
  this.formCar = {
    uuidCar: "",
    uuidBrand: "",
    uuidLine: "",
    uuidCustumer: "",
    plate: "",
    year: "",
    color: "",
    status: ""
  }
  this.mode = "Guardar";
}
onChangeModeCar(item: any, mode: string): void {
  if (mode === "Guardar") {
    this.formCar = {
      uuidCar: "",
      uuidBrand: "",
      uuidLine: "",
      uuidCustumer: "",
      plate: "",
      year: "",
      color: "",
      status: ""
    }
    this.mode = mode
  } else if (mode === "Editar") {
    this.formCar = item;
    this.mode = mode
  } else if (mode === "Eliminar") {
    this.serviceCar.delete(item.uuidCar).subscribe(
      (res) => {
        alert(res.message);
        this.get();
      }, (err) => {
        console.log(err)
      })
  }
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
