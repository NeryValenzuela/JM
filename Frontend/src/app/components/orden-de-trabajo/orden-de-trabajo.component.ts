import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-orden-de-trabajo',
  templateUrl: './orden-de-trabajo.component.html',
  styleUrls: ['./orden-de-trabajo.component.css']
})
export class OrdenDeTrabajoComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'orden', 'car', 'Estado'];


  ELEMENT_DATA: PeriodicElement[] = [
      {position: 1, name: 'Nery Valenzuela', orden: 4, car: 'Mazda Protege', Estado: 'En proceso'},
      {position: 2, name: 'Fernando Samayoa', orden: 5, car: 'Ford Runner', Estado: 'Finalizada'},
      {position: 3, name: 'Dania Lemus', orden: 9, car: 'Wolkswaguen Jetta', Estado: 'Finalizada'},
      {position: 4, name: 'Luis Guerra', orden: 10, car: 'Honda CR-V', Estado: 'En proceso'},
    ];

  constructor() { }



  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  orden: number;
  Estado: string;
  car: string;
}
