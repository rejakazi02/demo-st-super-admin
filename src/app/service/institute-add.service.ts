import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap, switchMap } from 'rxjs/operators';
import { catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';

let baseurl = ' https://api.omegaitsys.com/api/v1/';

@Injectable({
  providedIn: 'root',
})
export class InstituteAddService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  insttePost(signUpPayload: any) {
    return this.http.post<any>(baseurl + 'admin/institutes', signUpPayload);
  }

  instituteList(page: any) {
    let params = new HttpParams();
    if(page) {
      params = params.append('page', page);
    }
    // return this.http.get<any>(baseurl + 'admin/institutes')
    return this.http.get(baseurl + 'admin/institutes', {params});
  }

  IsLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  unionData(unionname: any) {
    return this.http.get(baseurl + 'unions', unionname);
  }

  CatData(CatType: any) {
    return this.http.get(baseurl + 'root-categories', CatType);
  }

  SubCatData(subCatType: any, select: any) {
    return this.http.get(baseurl + 'root-sub-categories/' + select, subCatType);
  }





// institute edit data 

getInstDataBySlug(slug: any){
  
  return this.http.get(baseurl + 'admin/institutes/' + slug);
  
}


instteUpdate(data: any, slug: any) {
  return this.http.put<any>(baseurl + 'admin/institutes/' + slug, data);
}





// data delete 
  deleteData(data: string) {
    return this.http.delete(baseurl + 'admin/institutes/' + data);
  }
}
