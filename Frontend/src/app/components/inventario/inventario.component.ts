import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  dataSource: any;
  mode = "Guardar";
  form = {
    uuidProduct: "",
    product: "",
    description: "",
    price: "",
    stock: ""
  }
  constructor(
    private service: ProductService
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
    if (this.form.stock !== "" && this.form.price !== "" &&
      this.form.description !== "" && this.form.product !== "") {
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
    uuidProduct: "",
    product: "",
    description: "",
    price: "",
    stock: ""
    }
    this.mode = "Guardar";
  }
  onChangeMode(item: any, mode: string): void {
    if (mode === "Guardar") {
      this.form = {
        uuidProduct: "",
        product: "",
        description: "",
        price: "",
        stock: ""
      }
      this.mode = mode
    } else if (mode === "Editar") {
      this.form = item;
      this.mode = mode
    } else if (mode === "Eliminar") {
      this.service.delete(item.uuidProduct).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })
    }
  }
}
