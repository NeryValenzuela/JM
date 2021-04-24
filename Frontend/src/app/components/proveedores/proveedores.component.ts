import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  displayedColumns: string[] = ['position', 'businessName', 'account', 'direction'];


  ELEMENT_DATA: PeriodicElement[] = [
      {position: 1, businessName: 'Respuestos Garcia', account: 3383982510, direction: 'Zona 2, barrio la Democracia, Jalapa'},
      {position: 2, businessName: 'La Marca', account: 3383944500, direction: 'Zona 1, barrio la Democracia, Jalapa'},
      {position: 3, businessName: 'Super Auto Repuestos', account: 398322518, direction: '9na Av Zona 13, Guatemala'},
    ];

  constructor() { }



  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  businessName: string;
  position: number;
  account: number;
  direction: string;
}
