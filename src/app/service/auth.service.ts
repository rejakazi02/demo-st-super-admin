import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const apiurl='https://api.omegaitsys.com/api/v1/admin/login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http:HttpClient) { }


proceedLogin(usercred: any){
return this.http.post<any>(apiurl, usercred)
}

IsLoggedIn(){
  return localStorage.getItem('token')!=null;
}


}
