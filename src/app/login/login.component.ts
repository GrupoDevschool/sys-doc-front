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
  loading: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService) {
    if(this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard'])
    }
  }

  login() {
    const login = {
      email: this.email,
      password: this.password
    }

    this.loading = true;

    this.loginService.login(login)
      .subscribe(
        data => {
          this.loginService.setToken(data.token);
          this.router.navigate(['/']);
        },
        error => {
          this.showError();
        }
      ).add(() => {
        this.loading = false;
      });
  }

  showError(){
    this.toastr.error("Login inválido")
  }
}
