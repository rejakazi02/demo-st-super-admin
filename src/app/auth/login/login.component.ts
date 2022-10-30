import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { AuthService } from './../../service/auth.service';
// import value from './../../../declarations.d';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  responceData: any;
  logInForm!: FormGroup;
  errorMessage:any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.logInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onlogIn() {
    // console.log(this.logInForm.value);
    if (this.logInForm.valid) {
      this.authService
        .proceedLogin(this.logInForm.value)
        .subscribe((result) => {
          if (result != null) {
            this.responceData = result;

            localStorage.setItem('token', this.responceData.access_token);

            this.route.navigate(['/', 'dashboard']);

            this.toastr.success(result.message);
          }
        },
        (err)=>{
          this.errorMessage=err.error.errors;
          if(err.error.errors.email){
            this.toastr.error(err.error.errors.email);
          }
          if(err.error.errors.password){
            this.toastr.error(err.error.errors.password);
          }
        });
    }
  }

  logout(): void {
    this.authService.logOut();
  }
}
