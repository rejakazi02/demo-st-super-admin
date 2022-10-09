import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap, switchMap } from 'rxjs/operators';
import { catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';

let baseurl = ' https://api.omegaitsys.com/api/v1/';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  params: {},
};

@Injectable({
  providedIn: 'root',
})
export class InstituteAddService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // @ts-ignore
      return throwError('An Error occurred: ', error.error.message);
    }
    return throwError(`${error.error.message}`);

    // return throwError('Internal server error!');
  }

  static log(message: string): any {
    console.log(message);
  }

  insttePost(signUpPayload: any): Observable<any> {
    return this.http
      .post(baseurl + 'admin/institutes', signUpPayload, HTTP_OPTIONS)
      .pipe(
        tap((_) => InstituteAddService.log('registered!')),
        catchError(this.handleError)
      );
  }

  // refreshToken(refreshTokenData: any): Observable<any> {
  //   HTTP_OPTIONS.params = {
  //     grant_type: 'refresh_token',
  //   };
  //   return this.http
  //     .post(baseurl + 'admin/login', refreshTokenData, HTTP_OPTIONS)
  //     .pipe(
  //       tap((event: any) => {
  //         // Save new Tokens
  //         this.tokenService.removeAccessToken();
  //         this.tokenService.removeRefreshToken();
  //         this.tokenService.saveAccessToken(event.data.access_token);
  //         this.tokenService.saveRefreshToken(event.data.refresh_token);
  //         // return event;
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  //   insttePost(inspost:any){
  //  return this.http.post( baseurl +'admin/institutes', inspost)
  //   }

  unionData(unionname: any) {
    return this.http.get(baseurl + 'unions', unionname);
  }

  CatData(CatType: any) {
    return this.http.get(baseurl + 'root-categories', CatType);
  }

  SubCatData(CatType: any) {
    return this.http.get(baseurl + 'root-categories', CatType);
  }
}
