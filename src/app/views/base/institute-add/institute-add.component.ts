import { Component, OnInit } from '@angular/core';

import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InstituteAddService } from './../../../service/institute-add.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute-add',
  templateUrl: './institute-add.component.html',
  styleUrls: ['./institute-add.component.scss'],
})
export class InstituteAddComponent implements OnInit {
  responceData: any;
  institutPost!: FormGroup;

  toppings = new FormControl('');
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  constructor(
    private instService: InstituteAddService,
    private fb: FormBuilder,

    private route: Router
  ) {}

  ngOnInit(): void {
    this.institutPost = this.fb.group({

      institutename: ['', Validators.required],
      instituteCat: ['', Validators.required],
      instituteSubCat: ['', Validators.required],
      instituteType: ['', Validators.required],
      unionName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  intSubmit() {
    if (this.institutPost.valid) {
      console.log(this.institutPost.value);
      this.instService
        .insttePost(this.institutPost.value)
        .subscribe((result) => {


          console.log(this.institutPost.value);

          this.responceData = result;
console.log(this.responceData);
          // if (result != null) {
          //   this.responceData = result;

          //   console.log(this.responceData);
          //   // console.log(result);
          //   // alert('Login Successfull');
          // }
        });
    }
  }
}
