import { Component, OnInit } from '@angular/core';
import { navItems } from './_adminDas';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  
})
export class AdminComponent implements OnInit {

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
