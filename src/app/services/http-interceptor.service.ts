// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { catchError } from 'rxjs/operators';

import { StoreService } from './store.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private storeService: StoreService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const jwt: string = this.storeService.getSync('jwt');
    if (jwt) request = request.clone({ setHeaders: { Authorization: jwt } });
    return next.handle(request).pipe(
      catchError((e: any, caught: Observable<HttpEvent<any>>) => {
        console.log('some error.. i need to write a toast componnent');
        return Observable.empty();
      })
    );
  }
}
