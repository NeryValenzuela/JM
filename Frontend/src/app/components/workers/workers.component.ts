import { Component, OnInit } from '@angular/core';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  dataSource: any;
  mode = "Guardar";
  form = {
    uuidMechanic: "",
    firstName: "",
    lastName: "",
    phone: "",
    checkBonus: false
  }
  constructor(
    private service: MechanicService
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
    if (this.form.phone !== "" &&
      this.form.lastName !== "" &&
      this.form.firstName !== "") {
      if (this.mode === "Guardar") {
       // console.log(this.form)
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
      uuidMechanic: "",
      firstName: "",
      lastName: "",
      phone: "",
      checkBonus: false
    }
    this.mode = "Guardar";
  }
  onChangeMode(item: any, mode: string): void {
    if (mode === "Guardar") {
      this.form = {
        uuidMechanic: "",
        firstName: "",
        lastName: "",
        phone: "",
        checkBonus: false
      }
      this.mode = mode
    } else if (mode === "Editar") {
      this.form = item;
      this.mode = mode
    } else if (mode === "Eliminar") {
      this.service.delete(item.uuidMechanic).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })
    }
  }
}
