import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailPDF } from 'src/app/components/job-a/job-a.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobAService {

  private URL = environment.urlbase + "job/"
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

  Detail(item: any): Observable<DetailPDF> {
    return this.httpClient.get<DetailPDF>(this.URL + item);
  }

}
