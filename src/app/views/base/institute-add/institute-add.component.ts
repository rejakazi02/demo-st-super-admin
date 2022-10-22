import { AddInstute } from './../../../models/institute.model';
import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InstituteAddService } from './../../../service/institute-add.service';
import { Router, ActivatedRoute } from '@angular/router';
import { param } from 'jquery';

@Component({
  selector: 'app-institute-add',
  templateUrl: './institute-add.component.html',
  styleUrls: ['./institute-add.component.scss'],
})
export class InstituteAddComponent implements OnInit {
  responceData: any;
  institutPost!: FormGroup;
  unionName?: any[];
  undata: any;
  catagoryData: any;
  catagoryDataa: any;
  subCatagoryData: any;
  slug?: any;
  getUpdateData: any;
  storeSelectValue:any = '';  
  isvalid:boolean = false;
  searchValue: any;

  addInstite = new AddInstute();

  // toppings = new FormControl('');

  constructor(
    private instService: InstituteAddService,
    private fb: FormBuilder,

    private route: Router,
    private activateRoute: ActivatedRoute
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

    // update data
    this.activateRoute.paramMap.subscribe((param) => {
      this.slug = param.get('slug');
      // console.log('param', this.slug )
      if (this.slug) {
        this.getInstDataBySlug(this.slug);
      } else {
        this.cattData();
      }
    });
  }





onUnionHide(){
  this.isvalid = false;
}
onUnoin(){
  this.isvalid=true;
}


getUnionSelectValue(data: any, evt:Event){

  evt.preventDefault();

  this.storeSelectValue = data;
  console.log("valuessss", this.storeSelectValue);
  this.isvalid=false;
}

getInputValue(inputData:any){
 
  this.searchValue = inputData.value;
  console.log("first", this.searchValue)
}



  // instiutte create here

  intSubmit() {
    

    if (this.getUpdateData) {
      this.instteUpdate(this.institutPost.value, this.getUpdateData.slug);
      alert(' Data Update Successfull');
    } else {
      this.instService
        .insttePost(this.institutPost.value)
        .subscribe((result) => {
          this.responceData = result;
         

          this.institutPost.reset();
          alert(' Data Insert Successfull');
        });
    }
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
       

        if (this.slug) {
          this.institutPost.patchValue({
            user_phone: this.getUpdateData.admin.phone,

            parent_category_id: this.catagoryData.find(
              (f: { id: any }) => f.id == this.getUpdateData.parent_category_id
            ).slug,
          });
        }
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

  getInstDataBySlug(slug: any) {
    this.instService.getInstDataBySlug(slug).subscribe((result) => {
      this.getUpdateData = result;
     
      this.cattData();
      this.setFormData();
    });
  }

  setFormData() {
    // this.institutPost.patchValue({
    //   // user_phone: this.getUpdateData.admin.phone,
    //   // categories_id: this.subCatagoryData.find((f: { id: any; }) => f.id == this.getUpdateData.first_category_id).slug,
    //   // categories_id: this.getUpdateData.first_category_id,
    // });
    this.institutPost.patchValue(this.getUpdateData);
  }

  instteUpdate(data: any, slug: any) {
    this.instService.instteUpdate(data, slug).subscribe((result) => {});
  }
}
