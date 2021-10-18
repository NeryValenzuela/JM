import { Component, OnInit } from '@angular/core';
import { OrdenTrabajoService } from 'src/app/services/ordenTrabajo/orden-trabajo.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CarService } from 'src/app/services/car/car.service';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-orden-de-trabajo',
  templateUrl: './orden-de-trabajo.component.html',
  styleUrls: ['./orden-de-trabajo.component.css']
})
export class OrdenDeTrabajoComponent implements OnInit {

  dataSource: any;
  dataSourceCar: any;
  dataSourceMechanic: any;
  dataSourceProduct: any;
  mode = "Guardar";
  form = {
    uuidWorkKog: "",
    uuidMechanic: "",
    uuidCar: "",
    uuidProduct: "",
    description: "",
    price: "",
    amountProduct: ""
  }

  constructor(
    private service: OrdenTrabajoService,
    private serviceCar: CarService,
    private serviceMechanic: MechanicService,
    private serviceProduct: ProductService
  ) { }

  ngOnInit(): void {
    this.get();
    this.getMechanic();
    this.getCar();
     this.getProduct();
  }

  get(): void {
    this.service.get().subscribe(
      (res) => {
        this.dataSource = res;
      }, (err) => {
        console.log(err)
      }
    )
  }

  getCar(): void {

    this.serviceCar.get().subscribe(
      (res) => {
        this.dataSourceCar = res.message;

      }, (err) => {
        console.log(err)
      }
    )
  }

  getMechanic(): void {
    this.serviceMechanic.get().subscribe(
      (res) => {
        this.dataSourceMechanic = res.message;

      }, (err) => {
        console.log(err)
      }
    )
  }

  getProduct(): void {
    this.serviceProduct.get().subscribe(
      (res) => {
        this.dataSourceProduct = res.message;

      }, (err) => {
        console.log(err)
      }
    )
  }



  ngSubmit(): void {
    if (this.form.amountProduct !== "" && this.form.price !== "" &&
      this.form.description !== "" && this.form.uuidProduct !== ""
      && this.form.uuidCar !== "" && this.form.uuidMechanic !== "") {
      if (this.mode === "Guardar") {
        this.service.create(this.form).subscribe(
          (res) => {
            alert(res.message);
            this.get();
          }, (err) => {
            console.log(err)
          })
      } else if (this.mode === "Editar") {
        this.service.update(this.form).subscribe(
          (res) => {
            alert(res.message);
            this.get();
          }, (err) => {
            console.log(err)
          })
      }
    }
  }

  onReset(): void {
    this.form = {
      uuidWorkKog: "",
      uuidMechanic: "",
      uuidCar: "",
      uuidProduct: "",
      description: "",
      price: "",
      amountProduct: ""
    }
   // this.mode = "Guardar";
  }
  onChangeMode(item: any, mode: string): void {

    if (mode === "Editar") {
      this.form = item;
      this.mode = mode
    } else if (mode === "Eliminar") {
      this.service.delete(item.uuidWorkKog).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })
    }
  }
}
