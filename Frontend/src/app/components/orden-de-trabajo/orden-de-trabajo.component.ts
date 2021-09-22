import { Component, OnInit } from '@angular/core';
import { OrdenTrabajoService } from 'src/app/services/ordenTrabajo/orden-trabajo.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orden-de-trabajo',
  templateUrl: './orden-de-trabajo.component.html',
  styleUrls: ['./orden-de-trabajo.component.css']
})
export class OrdenDeTrabajoComponent implements OnInit {

  dataSource: any;
  mode = "Guardar";
  form = {
    uuidWorkKog: "",
    uuidMechanic: "",
    uuidCar: "",
    uuidProduct: "",
    description: "",
    price: "",
    amount: ""
  }

  constructor(
    private service: OrdenTrabajoService,
  ) { }

  ngOnInit(): void {
    this.get();
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
  ngSubmit(): void {
    if (this.form.amount !== "" && this.form.price !== "" &&
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
      amount: ""
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
