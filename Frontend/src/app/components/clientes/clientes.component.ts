import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class CLientesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'cel', 'direction'];


  ELEMENT_DATA: PeriodicElement[] = [
      {position: 1, name: 'Nery Valenzuela', cel: 46224274, direction: 'Bo. San Francisco, Jalapa'},
      {position: 2, name: 'Javier Cortez', cel: 52481202, direction: 'Colonia las Marias, Jalapa'},
      {position: 3, name: 'Eunice Barrera', cel: 45857912, direction: 'Barrio el Porvenir, Jalapa'},
      {position: 4, name: 'Hector Sagastume', cel: 46879625, direction: 'Bo. San Francisco, Jalapa'},
      {position: 5, name: 'Javier Redondo', cel: 52481202, direction: 'Colonia las Marias, Jalapa'},
      {position: 6, name: 'Sara Lara', cel: 45857912, direction: 'Barrio el Porvenir, Jalapa'},
    ];

  constructor() { }



  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  cel: number;
  direction: string;
}
