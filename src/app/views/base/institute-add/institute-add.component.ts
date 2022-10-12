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
  catagoryData: any;
  catagoryDataa: any;
  subCatagoryData: any;

  addInstite=new AddInstute();

  toppings = new FormControl('');
  // toppingList: string[] = ['1 ', '2', '3', '4', '5', '6'];

  constructor(
    private instService: InstituteAddService,
    private fb: FormBuilder,

    private route: Router
  ) {}

  ngOnInit(): void {
    this.institutPost = this.fb.group({
      name: ['', Validators.required],
      eiin: ['', Validators.required],
      first_category_id: ['', Validators.required],
      categories_id: ['', Validators.required],
      type: ['', Validators.required],
      union_id: ['', Validators.required],
      user_name: ['', [Validators.required]],
      user_phone: ['', Validators.required],
      password: ['', Validators.required],
      
    });

    this.unionData();
    this.cattData();
    // this.SubCatData();
    // this.intSubmit();
  }

  // instiutte create here

  intSubmit() {
    // this.institutPost.reset();
    console.log('check data',this.institutPost.value);
    // if (this.institutPost.invalid) {
    //   console.log(this.institutPost.value);
    //   // alert('Select all field');
    // }
    this.instService.insttePost(this.institutPost.value).subscribe((result) => {
      // console.log(result);

      this.responceData = result;
      // localStorage.setItem('token',this.responceData.access_token);

      console.log('input data',this.responceData);

    });
  }

  // union code chere

  unionData() {
    this.instService.unionData(this.institutPost.value)
    .subscribe({
      next:((result) => {
        this.unionName = result;

      }),
      error:((err) => {
        console.log(err);
      })
   } );
  }

  // catagory code here
  cattData() {

    this.instService.CatData(this.institutPost.value)
    .subscribe({
      next:((result) => {
        this.catagoryData = result;
        console.log(this.catagoryData)
      }),
      error:((err) => {
        console.log(err);
      })
    });
  }
  // SubCatagory code here
  // SubCatData() {
  //   this.instService.SubCatData(this.institutPost.value).subscribe((result) => {
  //     this.subCatagoryData = result;
  //     console.log(this.subCatagoryData)

  //   });

  // }

  // instituteData:any[] = [
  //   {
  //    _id:1,
  //    instituteName:'Primary school',
  //    instituteCategory:['One','Two'],
  //    InstituteSubType:['sub-institute 1','Sub-Institute 2','Sub-Institute 3'],
  //   },
  //   {
  //     _id:2,
  //     instituteName:'High school',
  //     instituteCategory:['Four','Five'],
  //     InstituteSubType:['sub-institute 4','Sub-Institute 5','Sub-Institute 6'],

  //    },
  //    {
  //     _id:3,
  //     instituteName:' Collage',
  //     instituteCategory:['Six','Seven'],
  //     InstituteSubType:['sub-institute 6','Sub-Institute 7','Sub-Institute 8'],
  //    }
  //   ]

  // subType: any={
  //   _id:1,
  //   instituteName: ' ',
  //   instituteCategory:[],
  //   InstituteSubType:[],
  // }
  // subType: any={
  //   _id:1,
  //   instituteName: ' ',
  //   instituteCategory:[],
  //   InstituteSubType:[],
  // }

  getSubType(select: any) {
    this.instService
      .SubCatData(this.institutPost.value, select.value)
      .subscribe((result) => {
        this.subCatagoryData = result;
      });
  }

  // getSubType(select: any){
  //   console.log(select.value);
  // this.subType=this.instituteData.filter((value)=>{
  //   return value.instituteName===select.value;
  // })[0];
  // console.log(this.subType)
  // }
}
