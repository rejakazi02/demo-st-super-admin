import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { InstituteAddService } from './../../../service/institute-add.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-institute-list',
  templateUrl: './institute-list.component.html',
  styleUrls: ['./institute-list.component.scss'],
})
export class InstituteListComponent implements OnInit, AfterViewInit {
[x: string]: any;
  institutEList: any;
  instData: any;
  displayedColumns: string[] = [
    'institute_name',
    'eiin',
    'parent_category',
    'type',
    'union',
    'institute_phone',
    'action',
  ];
  dataSource = [];
 

  // Paginator Inputs
  current_page: any=1;
  last_page_number:any;
  itemPer_page: any = 2;
  totalpage:any;

  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  constructor(private insService: InstituteAddService, private router: Router) {}
  ngOnInit(): void {
    this.instList();
  }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput
  //       .split(',')
  //       .map((str) => +str);
  //   }
  // }

  // get institute list data
  instList() {
    this.insService.instituteList().subscribe((result) => {
      this.instData = result;
      console.log('instData', this.instData);
      this.dataSource = this.instData.institutes.data;

      // this.length = this.instData.institutes.meta.total;
      // this.pageSize = this.instData.institutes.meta.per_page;
      // this.pageSizeOptions = this.instData.institutes.meta.per_page;
      // console.log('this.dataSource',this.dataSource);

      // this.length = this.instData.institutes.meta.total;
      // this.pageSize = this.instData.institutes.links.next;
      // console.log(this.pageSize);
      // this.pageSizeOptions = this.instData.institutes.links.next;
      // console.log(this.pageSizeOptions);

      console.log('this.dataSource', this.dataSource);
    });
  }

  onPageChangeEvent(event: any) {}

// paiganation 
onPageChanged(e:number){
  this.current_page = e;
}

// institute delete data function 
  // deleteDataa(slug: string) {
  //   this.insService.deleteData(slug).subscribe((result) => {
  //     // window.location.reload();
  //     // alert(' Data Delete Successfull');
  //   });
  //   this. instList();
  // }

// institute delete data function 
  confirmBox(slug: string) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
         
        );
        this.insService.deleteData(slug).subscribe((result) => {
          // window.location.reload();
          // alert(' Data Delete Successfull');
        });
        this. instList();
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }




}
