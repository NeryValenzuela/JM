import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';
import { JobAService } from 'src/app/services/jobA/job-a.service';
import { MechanicService } from 'src/app/services/mechanic/mechanic.service';

// Para imprimir y generar codigo QR
import { Img, PdfMakeWrapper, QR, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
PdfMakeWrapper.setFonts(pdfFonts);
@Component({
  selector: 'app-job-a',
  templateUrl: './job-a.component.html',
  styleUrls: ['./job-a.component.css'],
})
export class JobAComponent implements OnInit {
  dataSource: any;
  dataSourceCar: any;
  dataSourceMechanic: any;
  dataSourceDet: any;
  mode = 'Guardar';
  form = {
    uuidMechanic: '',
    uuidCar: '',
    entryDate: '',
    departureDate: '',
    nextService: '',
    dateNextService: '',
    mileage: '',
  };
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
        this.dataSource = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCar(): void {
    this.serviceCar.get().subscribe(
      (res) => {
        this.dataSourceCar = res.message;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMechanic(): void {
    this.serviceMechanic.get().subscribe(
      (res) => {
        this.dataSourceMechanic = res.message;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngSubmit(): void {
    var en = this.form.entryDate !== '';
    /*var en = this.form.mileage !== "" &&
    this.form.dateNextService !== "" &&
    this.form.departureDate !== "" && this.form.entryDate !== "";*/
    if (en) {
      if (this.mode === 'Guardar') {
        this.service.create(this.form).subscribe(
          (res) => {
            alert(res.message);
            this.get();
          },
          (err) => {
            console.log(err);
          }
        );
      } else if (this.mode === 'Editar') {
        this.service.update(this.form).subscribe(
          (res) => {
            alert(res.message);
            this.get();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }

  onReset(): void {
    this.form = {
      uuidMechanic: '',
      uuidCar: '',
      entryDate: '',
      departureDate: '',
      nextService: '',
      dateNextService: '',
      mileage: '',
    };
    this.mode = 'Guardar';
  }
  onChangeMode(item: any, mode: string): void {
    if (mode === 'Guardar') {
      this.form = {
        uuidMechanic: '',
        uuidCar: '',
        entryDate: '',
        departureDate: '',
        nextService: '',
        dateNextService: '',
        mileage: '',
      };
      this.mode = mode;
    } else if (mode === 'Editar') {
      this.form = item;
      this.mode = mode;
    } else if (mode === 'Eliminar') {
      const formDelete = item.uuidMechanic + '_' + item.uuidCar;
      this.service.delete(formDelete).subscribe(
        (res) => {
          alert(res.message);
          this.get();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  work(item) {
    const dataBody = item.uuidMechanic + '_' + item.uuidCar;
    this.service.Detail(dataBody).subscribe(
      (res) => {

        this.dataSourceDet = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  PrintPDF(item) {
    const newItem = item as DataPDF;
    const dataBody = newItem.uuidMechanic + '_' + newItem.uuidCar;
    this.service.Detail(dataBody).subscribe(
      (res) => {
        console.log(res);
        const detail: MessageDetail[] = res.message;
        const dataItem = `

    Fecha de entrada: ${newItem.entryDate}
    Fecha de salida: ${newItem.departureDate}
    Millage: ${newItem.mileage}
    Vehiculo: ${newItem.brand} ${newItem.line} ${newItem.plate}
    Nombre del Mecanico: ${newItem.firstName} ${newItem.lastName}
    Productos utilizados:
    ${detail[0].product} Precio: ${detail[0].price} Cantidad: ${detail[0].amountProduct}
    ${detail[1].product} Precio: ${detail[1].price} Cantidad: ${detail[1].amountProduct}
    ${detail[2].product} Precio: ${detail[2].price} Cantidad: ${detail[2].amountProduct}
Fecha proximo servicio: ${newItem.dateNextService}

    Gracias por su preferencia
    `;

        const pdf = new PdfMakeWrapper();
        pdf.header('Comprobante');

        pdf.add(
          new Txt('Servicios Automotrices JM\nDetalle de servicio\n\n\n\nEscanear codigo para verificar el trabajo que se realizo')
            .fontSize(20)
            .alignment('center')
            .bold()
            .decoration('underline').end
        );
        pdf.add(new QR(dataItem).alignment('center').fit(200).end);
        pdf.add(
          new Txt(
            '\n\nGracias por tu preferencia\nWhatsapp:38065775\nTel:78224585'
          )
            .fontSize(15)
            .alignment('center')
            .bold().end
        );

        pdf.create().print();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

export interface DataPDF {
  uuidMechanic: string;
  uuidCar: string;
  entryDate: string;
  departureDate: string;
  nextService: boolean;
  dateNextService: string;
  mileage: string;
  bonus: string;
  firstName: string;
  lastName: string;
  brand: string;
  line: string;
  plate: string;
}

export interface MessageDetail {
  uuidWorkKog: string;
  uuidMechanic: string;
  uuidCar: string;
  uuidProduct: string;
  description: string;
  price: number;
  amountProduct: number;
  product: string;
  firstName: string;
  lastName: string;
  brand: string;
  line: string;
  plate: string;
}

export interface DetailPDF {
  message: MessageDetail[];
}
