import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const apiurl='https://api.omegaitsys.com/api/v1/admin/login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  refreshTokenInterval: any;


  constructor(private http:HttpClient,  private route: Router) { }


proceedLogin(usercred: any){
return this.http.post<any>(apiurl, usercred)
}

IsLoggedIn(){
  return localStorage.getItem('token')!=null;
}


logOut(): void {
  localStorage.removeItem('loginTime');
  // this.tokenService.removeAccessToken();
  // this.tokenService.removeRefreshToken();
  setTimeout(() => {
    clearInterval(this.refreshTokenInterval);
    this.refreshTokenInterval = null;
    this.route.navigate(['/auth/login']);
  }, 1000);
}


}
