import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orden } from '../common/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenDeTrabajoService {
  private URL = 'http://localhost:4200/';
  constructor(private httpClient: HttpClient) { }


  getOrden(){
    return this.httpClient.get<Orden>(this.URL + 'orden');
      }
}
