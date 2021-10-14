import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private URL = 'http://localhost:4200/';
  constructor(private httpClient : HttpClient) { }

  login(user){
      console.log(user);
      return this.httpClient.post<any>(this.URL + 'login', user);
  }

  logout(){
    localStorage.removeItem('token');

  }
  logedIn(){
    return !!localStorage.getItem('token');

  }
  getToken(){
    return localStorage.getItem('token');

  }
}
