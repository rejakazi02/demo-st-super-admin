import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { AuthService } from './../../service/auth.service';
// import value from './../../../declarations.d';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  responceData: any;
  logInForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.logInForm = this.fb.group({
      email: ['', [ Validators.required]],
      password: ['', Validators.required],
    });
  }

  logIn() {
    // console.log(this.logInForm.value);
    if (this.logInForm.valid) {
      this.authService
        .proceedLogin(this.logInForm.value)
        .subscribe((result) => {
          if (result != null) {
            this.responceData = result;

            localStorage.setItem('token',this.responceData.access_token);
           
            this.route.navigate(['/', 'dashboard']);
            console.log('login token',this.responceData.access_token);
            alert('Login Successfull');
          }
        });

    }


    if (this.logInForm.valid) {
      this.authService
        .anyUserLogin(this.logInForm.value)
        .subscribe((result) => {
          if (result != null) {
            this.responceData = result;

            localStorage.setItem('token',this.responceData.access_token);
            this.route.navigate(['/', 'adminn']);
            console.log('login token',this.responceData.access_token);
            alert('Login user Successfull');
          }
        });
    }



    
    
  }






  logout(): void {
    this.authService.logOut();
  }
}
