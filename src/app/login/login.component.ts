import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {
    if(this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard'])
    }
  }

  @Output() _loggedIn = new EventEmitter<boolean>();

  ngOnInit(): void {

  }

}
