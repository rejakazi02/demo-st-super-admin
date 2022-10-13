import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
// import { InstituteAddService } from './../service/institute-add.service';
// private instadd: InstituteAddService

@Injectable()
export class AuthUserInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token');
   
    if (authToken) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
      return next.handle(authRequest);
    }
    else {

      const authRequest = req.clone();
      return next.handle(authRequest);
    }
  }
}
