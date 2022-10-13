import {Component, OnInit} from '@angular/core';
import { InstituteAddService } from './../../../service/institute-add.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-institute-list',
  templateUrl: './institute-list.component.html',
  styleUrls: ['./institute-list.component.scss']
})
export class InstituteListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = ELEMENT_DATA;

  institutEList:any;
 

constructor( private insService: InstituteAddService){

}
  ngOnInit(): void {
    this.instList();
  }

  // cattData() {

  //   this.instService.CatData(this.institutPost.value)
  //   .subscribe({
  //     next:((result) => {
  //       this.catagoryData = result;
  //       console.log(this.catagoryData)
  //     }),
  //     error:((err) => {
  //       console.log(err);
  //     })
  //   });
  // }



instList() {

 this.insService.instituteList().subscribe(result=>{
  console.log('result', result);
 })
}




}
