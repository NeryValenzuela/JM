import { Component, OnInit } from '@angular/core';
import { CustumerService } from 'src/app/services/custumer/custumer.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class CLientesComponent implements OnInit {

  dataSource: any;
  mode = "Guardar";
  form = {
    uuidCustumer: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: ""
  }
  constructor(
    private service: CustumerService
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
    if (this.form.address !== "" && this.form.lastName !== "" &&
      this.form.firstName !== "" && this.form.phone !== "") {
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
      uuidCustumer: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: ""
    }
    this.mode = "Guardar";
  }
  onChangeMode(item: any, mode: string): void {
    if (mode === "Guardar") {
      this.form = {
        uuidCustumer: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: ""
      }
      this.mode = mode
    } else if (mode === "Editar") {
      this.form = item;
      this.mode = mode
    } else if (mode === "Eliminar") {
      this.service.delete(item.uuidCustumer).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })
    }
  }
}
