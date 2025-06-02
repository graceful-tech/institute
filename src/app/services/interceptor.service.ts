import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IS_APPLY_JOB_REQUEST, IS_GLOBAL_REQUEST } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  defaultTenant = '00000';

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   if (request.url.includes('/login') || request.url.includes('/google-login') || request.url.includes('/user/create')
    ) {
      console.log('Skipping interceptor for login request');
      return next.handle(request);
    }


      const username: any = localStorage.getItem('userName');
      const userid: any = localStorage.getItem('userId');
      request = request.clone({
        setHeaders: {
          username: username,
          userId: userid,
        },
      });
    //}

    return next.handle(request);
  }
}
