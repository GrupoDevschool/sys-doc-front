import { Component, ErrorHandler, Input, OnInit } from '@angular/core';
import { GlobalErrorHandler } from 'src/app/core/error/global-error-handler';
import { MENU_ITEMS } from '../home.routes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
export class MenuComponent implements OnInit {
  @Input() opened:boolean = false;

  items = MENU_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

}
