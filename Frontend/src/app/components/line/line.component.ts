import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand/brand.service';
import { LineService } from 'src/app/services/line/line.service';

import { PdfMakeWrapper, QR, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  dataSource: any;
  dataSourceBrand: any;
  mode = "Guardar";
  form = {
    uuidLine: "",
    uuidBrand: "",
    line: "",
  }
  constructor(
    private service: LineService,
    private serviceBrand: BrandService
  ) { }

  ngOnInit(): void {
    this.get();
    this.getBrand();
  }
  getBrand(): void {
    this.serviceBrand.get().subscribe(
      (res) => {
        this.dataSourceBrand = res;
        //console.log(res)
      }, (err) => {
        console.log(err)
      }
    )
  }


  get(): void {
    this.service.get().subscribe(
      (res) => {
       // console.log(res)
        this.dataSource = res;
      }, (err) => {
        console.log(err)
      }
    )
  }
  ngSubmit(): void {
    if (this.form.line !== "" && this.form.uuidBrand !== "") {
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
      uuidLine: "",
      uuidBrand: "",
      line: ""
    }
    this.mode = "Guardar";
  }
  onChangeMode(item: any, mode: string): void {
    if (mode === "Guardar") {
      this.form = {
        uuidLine: "",
        uuidBrand: "",
        line: ""
      }
      this.mode = mode
    } else if (mode === "Editar") {
      this.form = item;
      this.mode = mode
    } else if (mode === "Eliminar") {
      this.service.delete(item.uuidLine).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })
    }
  }


}
