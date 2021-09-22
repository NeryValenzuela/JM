import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {


  dataSource: any;
  mode = "Guardar";
  form = {
    uuidCar: "",
    uuidBrand: "",
    uuidLine: "",
    uuidCustumer: "",
    plate: "",
    year: "",
    color: "",
    status: ""
  }
  constructor(
    private service: CarService
  ) { }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.service.get().subscribe(
      (res) => {
        console.log(res)
        this.dataSource = res;
      }, (err) => {
        console.log(err)
      }
    )
  }
  ngSubmit(): void {
    if (this.form.status !== "" && this.form.color !== "" &&
      this.form.year !== "" && this.form.plate !== "" &&
      this.form.uuidCustumer !== "" && this.form.uuidLine !== "" &&
      this.form.uuidBrand !== "") {
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
  onChangeMode(item: any, mode: string): void {
    if (mode === "Guardar") {
      this.form = {
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
      this.form = item;
      this.mode = mode
    } else if (mode === "Eliminar") {
      this.service.delete(item.uuidCar).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })
    }
  }
}
