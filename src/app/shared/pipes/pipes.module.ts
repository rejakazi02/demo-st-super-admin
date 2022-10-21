import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnionFilterPipe } from './union-filter.pipe';



@NgModule({
  declarations: [
    UnionFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UnionFilterPipe,
  ]
})
export class PipesModule { }
