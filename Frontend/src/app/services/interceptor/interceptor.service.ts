import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Tokenreq = req.clone({
      setHeaders: {
        'x-token-access': 'bearer ' + localStorage.getItem("token")
      },

    });
    return next.handle(Tokenreq);

  }
}
