import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { UserData } from 'src/app/shared/model/UserData';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpen: boolean = false;
  @Output() switchMenu = new EventEmitter<boolean>();
  userData: UserData = {} as UserData;

  constructor(private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.userData = this.loginService.getUserData();
  }

  emit() {
    this.isMenuOpen = !this.isMenuOpen;
    this.switchMenu.emit(true);
  }

  logout() {
    this.loginService.logout();
  }

}
