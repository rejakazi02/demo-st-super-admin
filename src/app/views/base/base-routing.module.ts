import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { InstituteListComponent } from './institute-list/institute-list.component';
import { InstituteAddComponent } from './institute-add/institute-add.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Institute',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'instituteAdd',
        component: InstituteAddComponent,
        data: {
          title: 'Institute Add',
        },
      },
      {
        path: 'instituteEdit/:slug',
        component: InstituteAddComponent,
        data: {
          title: 'Institute Add',
        },
      },
      {
        path: 'instList',
        component: InstituteListComponent,
        data: {
          title: 'Institute List',
        },
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

