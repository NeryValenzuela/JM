import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { LineService } from 'src/app/services/line/line.service';
import { CustumerService } from 'src/app/services/custumer/custumer.service';

import { PdfMakeWrapper, QR, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {


  dataSource: any;
  dataSourceBrand: any;
  dataSourceLine: any;
  dataSourceCustumer: any;

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
    private service: CarService,
    private serviceBrand: BrandService,
    private serviceLine: LineService,
    private serviceCustumer: CustumerService
  ) { }

  ngOnInit(): void {
    this.get();
    this.getBrand();
    this.getLine();
    this.getCustumer();
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

  ///Obtener datos de Marca de vehiculo
  getBrand(): void {
    this.serviceBrand.get().subscribe(
      (res) => {
        this.dataSourceBrand = res;

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

      }, (err) => {
        console.log(err)
      }
    )
  }

  //Obtener datos del cliente
  getCustumer(): void {
    this.serviceCustumer.get().subscribe(
      (res) => {

        this.dataSourceCustumer = res;
      }, (err) => {
        console.log(err)
      }
    )
  }


  ngSubmit(): void {
    debugger
    if (this.form.color !== "" &&
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


  PrintPDF() {
    const pdf = new PdfMakeWrapper();

    pdf.add(new Txt('Servicios Automotrices JM\n\nDetalle de servicio\n\n').fontSize(20).alignment('center').bold().decoration('underline').end);
    pdf.add(new QR('Me hace mucha falta socio').alignment('center').fit(200).end)
    pdf.create().print();
  }
}
