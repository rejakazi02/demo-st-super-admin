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

  toppings = new FormControl('');
  toppingList: string[] = ['1 ', '2', '3', '4', '5', '6'];

  constructor(
    private instService: InstituteAddService,
    private fb: FormBuilder,

    private route: Router
  ) {}

  ngOnInit(): void {
    this.institutPost = this.fb.group({
      name: ['', Validators.required],
      eiin: ['', Validators.required],
      categories_id: ['', Validators.required],
      type: ['', Validators.required],
      union_id: ['', Validators.required],
      user_name: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      user_phon: ['', Validators.required],
    });

    this.unionData();
    this.cattData();
    // this.SubCatData();
    
  }

  // instiutte create here

  intSubmit() {
    console.log(this.institutPost.value);
    if (this.institutPost.valid) {
      // console.log(this.institutPost.value);
      this.instService
        .insttePost(this.institutPost.value)
        .subscribe((result) => {
          console.log(result);

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

  // union code chere

  unionData() {
    this.instService.unionData(this.institutPost.value).subscribe((result) => {
      // console.log(result);

      this.unionName = result;
      // console.log(this.unionName);
    });
  }

  // catagory code here
  cattData() {
    // console.log(select.value)
    this.instService.CatData(this.institutPost.value).subscribe((result) => {
      this.catagoryData = result;
      // console.log(this.catagoryData)
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

  getSubType(select: any){
  console.log(select.value);
  this.instService.SubCatData(this.institutPost.value, select.value).subscribe((result) => {
    this.subCatagoryData = result;
    console.log(this.subCatagoryData)
    
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
