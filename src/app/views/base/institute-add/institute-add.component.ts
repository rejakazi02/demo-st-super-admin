import { AddInstute } from './../../../models/institute.model';
import { Component, OnInit } from '@angular/core';

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
  unionName: any;
  undata: any;
  catagoryData: any;
  catagoryDataa: any;
  subCatagoryData: any;

  addInstite = new AddInstute();

  toppings = new FormControl('');

  constructor(
    private instService: InstituteAddService,
    private fb: FormBuilder,

    private route: Router
  ) {}

  ngOnInit(): void {
    this.institutPost = this.fb.group({
      name: ['', Validators.required],
      eiin: ['', Validators.required],
      parent_category_id: ['', Validators.required],
      categories_id: ['', Validators.required],
      type: ['', Validators.required],
      union_id: ['', Validators.required],
      user_name: ['', [Validators.required]],
      user_phone: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.unionData();
    this.cattData();
  }

  // instiutte create here

  intSubmit() {
    this.instService.insttePost(this.institutPost.value).subscribe((result) => {
      this.responceData = result;
      this.institutPost.reset();
    });
  }

  // union code chere

  unionData() {
    this.instService.unionData(this.institutPost.value).subscribe({
      next: (result) => {
        this.undata = result;
        this.unionName = this.undata.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // catagory code here
  cattData() {
    this.instService.CatData(this.institutPost.value).subscribe({
      next: (result) => {
        this.catagoryData = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSubType(select: any) {
    this.instService
      .SubCatData(this.institutPost.value, select.value)
      .subscribe((result) => {
        this.subCatagoryData = result;
      });
  }
}
