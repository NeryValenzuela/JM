import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';
import { JobAService } from 'src/app/services/jobA/job-a.service';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';

// Para imprimir y generar codigo QR
import { PdfMakeWrapper, QR, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts);
@Component({
  selector: 'app-job-a',
  templateUrl: './job-a.component.html',
  styleUrls: ['./job-a.component.css']
})
export class JobAComponent implements OnInit {

  dataSource: any;
  dataSourceCar: any;
  dataSourceMechanic: any;
  mode = "Guardar";
  form = {
    uuidMechanic: "",
    uuidCar: "",
    entryDate: "",
    departureDate: "",
    nextService: "",
    dateNextService: "",
    mileage: "",
    bonus: "",
  }
  constructor(
    private service: JobAService,
    private serviceCar: CarService,
    private serviceMechanic: MechanicService

  ) { }

  ngOnInit(): void {
    this.get();
    this.getMechanic();
    this.getCar();
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

  getCar(): void {

    this.serviceCar.get().subscribe(
      (res) => {
        this.dataSourceCar = res.message;
        console.log(res)
      }, (err) => {
        console.log(err)
      }
    )
  }

  getMechanic(): void {
    this.serviceMechanic.get().subscribe(
      (res) => {
        this.dataSourceMechanic = res.message;
        console.log(res)
      }, (err) => {
        console.log(err)
      }
    )
  }

  ngSubmit(): void {
    debugger
    var en = this.form.mileage !== "" &&
    this.form.dateNextService !== "" &&
    this.form.departureDate !== "" && this.form.entryDate !== "";
    if (en) {
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
      uuidMechanic: "",
      uuidCar: "",
      entryDate: "",
      departureDate: "",
      nextService: "",
      dateNextService: "",
      mileage: "",
      bonus: "",
    }
    this.mode = "Guardar";
  }
  onChangeMode(item: any, mode: string): void {
    if (mode === "Guardar") {
      this.form = {
        uuidMechanic: "",
        uuidCar: "",
        entryDate: "",
        departureDate: "",
        nextService: "",
        dateNextService: "",
        mileage: "",
        bonus: "",
      }
      this.mode = mode
    } else if (mode === "Editar") {
      this.form = item;
      this.mode = mode
    } else if (mode === "Eliminar") {
      this.service.delete(item.uuidMechanic && item.uuidCar).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        }, (err) => {
          console.log(err)
        })
    }
  }

  PrintPDF(item) {
    const pdf = new PdfMakeWrapper();

    pdf.add(new Txt('Servicios Automotrices JM\n\nDetalle de servicio\n\n').fontSize(20).alignment('center').bold().decoration('underline').end);
    pdf.add(new QR(JSON.stringify(item)).alignment('center').fit(200).end)
    pdf.create().print();
  }
}
