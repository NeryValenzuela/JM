import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  dataSource: any;
  mode = "Guardar";
  form = {
    uuidProvider: "",
    businessName: "",
    phone: "",
    bankAccount: "",
    address: ""
  }
  constructor(
    private service: ProviderService
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
    if (this.form.address !== "" && this.form.bankAccount !== "" &&
      this.form.businessName !== "" && this.form.phone !== "") {
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
      uuidProvider: "",
      businessName: "",
      phone: "",
      bankAccount: "",
      address: ""
    }
    this.mode = "Guardar";
  }
  onChangeMode(item: any, mode: string): void {
    if (mode === "Guardar") {
      this.form = {
        uuidProvider: "",
        businessName: "",
        phone: "",
        bankAccount: "",
        address: ""
      }
      this.mode = mode
    } else if (mode === "Editar") {
      this.form = item;
      this.mode = mode
    } else if (mode === "Eliminar") {
      this.service.delete(item.uuidProvider).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })
    }
  }
}
