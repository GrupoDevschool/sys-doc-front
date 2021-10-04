import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'sys-doc';

  isLogged: boolean;

  constructor(
  private loginService:LoginService) {
    this.loginService.isExpired();

    this.isLogged = this.loginService.isLoggedIn();
  }

  updateAuth(){
    this.isLogged = this.loginService.isLoggedIn();
  }

  ngOnInit() {
  }
}
