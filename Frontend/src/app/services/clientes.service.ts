import { Cliente } from './../common/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private URL = 'http://localhost:4200/';
  constructor(private httpClient: HttpClient) { }

  getCliente(){
return this.httpClient.get<Cliente>(this.URL + 'cientes');
  }
}
