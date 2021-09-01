import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenTrabajoService {

  private URL = environment.urlbase + "orden-de-trabajo/"
  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get<any>(this.URL);
  }

  create(item: any): Observable<any> {
    return this.httpClient.post<any>(this.URL, item);
  }

  update(item: any): Observable<any> {
    return this.httpClient.put<any>(this.URL, item);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.URL + id);
  }

}
