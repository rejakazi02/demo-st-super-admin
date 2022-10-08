import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

import { HttpClient } from '@angular/common/http';

let baseurl= environment.APIURL;

@Injectable({
  providedIn: 'root'
})
export class InstituteAddService {

  constructor( private http: HttpClient) { }


  insttePost(inspost:any){
 return this.http.post( baseurl +'admin/institutes', inspost)
  }
}

