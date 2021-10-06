import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title = 'sys-doc';

  isLogged: boolean;

  constructor(
  private loginService:LoginService) {
    this.isLogged = this.loginService.isLoggedIn();
    this.loginService.getIsAuthenticated().subscribe(data => this.isLogged = data);
  }
}
