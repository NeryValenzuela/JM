import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.urlbase + "login"
  constructor(private httpClient: HttpClient, private routes: Router) { }

  access(item: any): Observable<any> {
    return this.httpClient.post<any>(this.URL, item);
  }

  logIn(): boolean {
    return !!localStorage.getItem("token")
  }

  logout(): void {
    localStorage.clear();
    this.routes.navigate(["/"]);

  }
}
