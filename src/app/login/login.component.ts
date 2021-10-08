import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor(private loginService: LoginService, private router: Router) {
    if(this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard'])
    }
  }

  login() {
    const login = {
      email: this.email,
      password: this.password
    }

    this.loginService.login(login)
      .subscribe(
        data => {
          this.loginService.setToken(data.token);
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      )
  }
}
